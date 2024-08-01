export function validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
  
  export function validatePassword(password: string): boolean {
    return password.length >= 8;
  }
  
  export function validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 20;
  }