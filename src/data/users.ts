export interface User {
  email: string;
  password: string;
}

export const testUsers: User[] = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "testpass" },
];
