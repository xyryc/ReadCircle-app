export type User = {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: string;
};

export type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};
