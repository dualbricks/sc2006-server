declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
      }
    }
  }

  export {}