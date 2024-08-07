declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_URL: string;
    NODE_ENV: string;
    PORT: number;
    JWT_SECRET_KEY: string;
  }
}
