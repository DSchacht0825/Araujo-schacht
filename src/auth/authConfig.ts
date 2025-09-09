// Simple authentication config for Daniel and Yvonne
// Passwords can be set via environment variables or changed here directly

export interface UserAccount {
  email: string;
  password: string;
  name: 'Daniel' | 'Yvonne';
  id: string;
}

// Get passwords from environment variables or use defaults
// To change passwords:
// 1. Create a .env.local file (copy from .env.example)
// 2. Set your passwords there
// OR just change them directly below

const danielPassword = process.env.REACT_APP_DANIEL_PASSWORD || 'ChangeMe2025!D';
const yvonnePassword = process.env.REACT_APP_YVONNE_PASSWORD || 'ChangeMe2025!Y';

// For simplicity and security, these are the only two accounts allowed
export const authorizedAccounts: UserAccount[] = [
  {
    email: process.env.REACT_APP_DANIEL_EMAIL || 'schacht.dan@gmail.com',
    password: danielPassword,
    name: 'Daniel',
    id: 'daniel-user'
  },
  {
    email: process.env.REACT_APP_YVONNE_EMAIL || 'yviea2013@gmail.com',
    password: yvonnePassword,
    name: 'Yvonne', 
    id: 'yvonne-user'
  }
];

export const validateLogin = (email: string, password: string): UserAccount | null => {
  console.log('validateLogin called with:', { email, password });
  console.log('Authorized accounts:', authorizedAccounts);
  
  const user = authorizedAccounts.find(
    account => {
      const emailMatch = account.email.toLowerCase() === email.toLowerCase();
      const passwordMatch = account.password === password;
      console.log(`Checking ${account.email}: emailMatch=${emailMatch}, passwordMatch=${passwordMatch}`);
      return emailMatch && passwordMatch;
    }
  );
  
  console.log('validateLogin result:', user);
  return user || null;
};

// Simple password validation
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};