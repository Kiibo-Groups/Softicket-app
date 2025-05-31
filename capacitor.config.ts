import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'softicket',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
,
    android: {
       buildOptions: {
          keystorePath: 'e:\Proyectos\Softicket-app\Firmakey.jks',
          keystoreAlias: 'softicket',
       }
    }
  };

export default config;
