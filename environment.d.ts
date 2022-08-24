declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        JWT_SERCRET: string;
        MONGODB_PW: string;
        MAP_API_KEY: string;
      }
    }
  }

  export {}