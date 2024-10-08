declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_URL: string;
    NODE_ENV: string;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_S3_BUCKET: string;
    AWS_CLOUDFRONT_DOMAIN: string;
    GUEST_NAME: string;
    GUEST_PASSWORD: string;
  }
}
