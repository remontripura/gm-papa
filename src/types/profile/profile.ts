export interface Profile {
  status: boolean;
  user: {
    id: number;
    name: string;
    phone: string | null;
    email: string;
    image: string;
    role: string;
    email_verified_at: string | null;
    wallet: number;
    created_at: string;
    updated_at: string;
  };
}

export type profileResponse = {
  status: boolean;
  user: {
    id: number;
    name: string;
    phone: string | null;
    email: string;
    image: string;
    role: string;
    email_verified_at: string | null;
    wallet: number;
    created_at: string;
    updated_at: string;
  };
  message: string;
};
