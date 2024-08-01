import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';
const { sortBy } = lodash;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

interface Challenge {
  maxScore: number;
}

const challenges: { [key: string]: Challenge } = {
  'javascript-async-1': { maxScore: 100 },
  'javascript-async-2': { maxScore: 150 },
  'tailwind-maze': { maxScore: 120 }
};

interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (user: any) => boolean;
}

const achievements: Achievement[] = [
  {
    id: 'first_challenge',
    name: 'Primer Desafío',
    description: 'Completa tu primer desafío',
    condition: (user) => Object.values(user.progress).some((challenge: any) => challenge.completado)
  },
  {
    id: 'all_challenges',
    name: 'Maestro de Desafíos',
    description: 'Completa todos los desafíos disponibles',
    condition: (user) => Object.keys(challenges).every((challengeId) => user.progress[challengeId]?.completado)
  },
  {
    id: 'high_scorer',
    name: 'Alto Puntaje',
    description: 'Obtén una puntuación total de 300 puntos',
    condition: (user) => Object.values(user.progress).reduce((sum: number, challenge: any) => sum + (challenge.puntuacion || 0), 0) >= 300
  }
];

// Esta será nuestra "base de datos" temporal
const users: { id: number; username: string; email: string; password: string; progress: any; achievements: string[] }[] = [];

interface LeaderboardEntry {
  userId: number;
  username: string;
  totalScore: number;
  completedChallenges: number;
}

function calculateLeaderboard(): LeaderboardEntry[] {
  return sortBy(
    users.map(user => ({
      userId: user.id,
      username: user.username,
      totalScore: Object.values(user.progress).reduce((sum: number, challenge: any) => sum + (challenge.puntuacion || 0), 0),
      completedChallenges: Object.values(user.progress).filter((challenge: any) => challenge.completado).length
    })),
    ['totalScore', 'completedChallenges']
  ).reverse().slice(0, 10); // Top 10 usuarios
}

app.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
    progress: {},
    achievements: []
  };

  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Intento de login para:', email);

  // Buscar usuario
  const user = users.find(user => user.email === email);

  if (!user) {
    console.log('Usuario no encontrado:', email);
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }

  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log('Contraseña inválida para:', email);
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }

  console.log('Login exitoso para:', email);

  // Generar token
  const token = jwt.sign({ id: user.id, email: user.email }, 'tu_secreto_jwt', { expiresIn: '1h' });

  res.json({ token });
});

// Middleware para verificar el token JWT
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'tu_secreto_jwt', (err: jwt.VerifyErrors | null, user: any) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
}

// Endpoint para guardar el progreso del usuario
app.post('/save-progress', authenticateToken, (req: Request, res: Response) => {
  const { desafioId, codigo, completado, puntuacion } = req.body;
  const userId = (req as any).user.id;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (!user.progress) {
    user.progress = {};
  }

  user.progress[desafioId] = {
    codigo,
    completado,
    puntuacion: Math.min(puntuacion, (challenges[desafioId] as Challenge).maxScore)
  };

  const previousAchievements = [...user.achievements];
  checkAndUpdateAchievements(user);
  const newAchievements = user.achievements.filter(a => !previousAchievements.includes(a));

  res.json({ 
    message: 'Progreso guardado exitosamente', 
    newAchievements: newAchievements.map(id => achievements.find(a => a.id === id))
  });
});

// Endpoint para obtener el progreso del usuario
app.get('/user-progress', authenticateToken, (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const progress = user.progress || {};
  const totalScore = Object.values(progress).reduce((sum: number, challenge: any) => sum + (challenge.puntuacion || 0), 0);
  const maxPossibleScore = Object.values(challenges).reduce((sum, challenge) => sum + challenge.maxScore, 0);

  const userAchievements = achievements.filter(a => user.achievements.includes(a.id));

  const leaderboard = calculateLeaderboard();
  const userRank = leaderboard.findIndex(entry => entry.userId === userId) + 1;

  res.json({
    progress,
    totalScore,
    maxPossibleScore,
    achievements: userAchievements,
    rank: userRank > 0 ? userRank : 'No clasificado'
  });
});

app.get('/leaderboard', (req: Request, res: Response) => {
  const leaderboard = calculateLeaderboard();
  res.json(leaderboard);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Endpoint para verificar el token
app.post('/verify-token', authenticateToken, (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const user = users.find(u => u.id === userId);
    if (user) {
      res.json({ id: user.id, email: user.email });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });

function checkAndUpdateAchievements(user: any) {
  achievements.forEach(achievement => {
    if (!user.achievements.includes(achievement.id) && achievement.condition(user)) {
      user.achievements.push(achievement.id);
    }
  });
}