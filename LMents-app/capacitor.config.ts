import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.LMents.LMentsapp',
  appName: 'LMents',
  webDir: 'build',
  server: {
    url: 'http://localhost:5173'
  }
};

export default config;
