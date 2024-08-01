import { writable } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set, update } = writable({
        isAuthenticated: false,
        token: null,
        user: null
    });

    return {
        subscribe,
        login: (token, user) => {
            localStorage.setItem('token', token);
            set({ isAuthenticated: true, token, user });
        },
        logout: () => {
            localStorage.removeItem('token');
            set({ isAuthenticated: false, token: null, user: null });
        },
        checkAuth: () => {
            const token = localStorage.getItem('token');
            if (token) {
                set({ isAuthenticated: true, token, user: null }); // Puedes decodificar el token para obtener la información del usuario si lo necesitas
            }
        }
    };
}

export const auth = createAuthStore();