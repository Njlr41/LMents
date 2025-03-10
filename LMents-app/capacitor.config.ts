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
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'angular-sqlite-app-starter',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Title",
        biometricSubTitle : "Subtitle"
      },
      electronIsEncryption: true,
      electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
      electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
      electronLinuxLocation: "Databases"
    }
  }
};

export default config;
