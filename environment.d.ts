declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        JWT_SECRET: string;
        MONGODB_PW: string;
        MAP_EMAIL: string;
        MAP_PASSWORD: string;
        DB_PW: string;
        API_MAP_KEy: string;
      }
    }
  }

  export {}