const config = {
  nextAuthUrl: process.env.NEXTAUTH_URL,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  mainBaseUrl: process.env.NEXT_PUBLIC_MAIN_BASE,
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  appName: process.env.NEXT_PUBLIC_APP_NAME,
};
export default config;
