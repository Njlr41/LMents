import type { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CapacitorConfig = {
  appId: 'com.LMents.LMentsapp',
  appName: 'LMents',
  webDir: 'build',
  server: {
    url: 'http://localhost:5173',
  },
};

export default config;
