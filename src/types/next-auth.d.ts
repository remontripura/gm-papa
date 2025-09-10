import "next-auth";

declare module "next-auth" {
  interface Session {
    id_token?: string | null; // ✅ add your custom field

    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string | null; // ✅ keep JWT consistent
  }
}
