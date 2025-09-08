// Simple authentication config for Daniel and Yvonne
// In production, you'd want to hash these passwords and store them securely

export interface UserAccount {
  email: string;
  password: string;
  name: 'Daniel' | 'Yvonne';
  id: string;
}

// For simplicity and security, these are the only two accounts allowed
export const authorizedAccounts: UserAccount[] = [
  {
    email: 'daniel@araujo-schacht.com',
    password: 'BelongingBecoming2025!', // You can change this
    name: 'Daniel',
    id: 'daniel-user'
  },
  {
    email: 'yvonne@araujo-schacht.com',
    password: 'BelongingBecoming2025!', // You can change this
    name: 'Yvonne', 
    id: 'yvonne-user'
  }
];

export const validateLogin = (email: string, password: string): UserAccount | null => {
  const user = authorizedAccounts.find(
    account => account.email.toLowerCase() === email.toLowerCase() && 
               account.password === password
  );
  return user || null;
};

// Simple password validation
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};