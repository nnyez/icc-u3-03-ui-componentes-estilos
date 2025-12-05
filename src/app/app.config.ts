import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCcSCzOS7Lj-UeAdLNDCy7oNMJJzR1t4j8',
  authDomain: 'ui-components-d42c0.firebaseapp.com',
  projectId: 'ui-components-d42c0',
  storageBucket: 'ui-components-d42c0.firebasestorage.app',
  messagingSenderId: '200766859318',
  appId: '1:200766859318:web:1582c32b14637056fbd097',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()), // habilita HttpClient usando la API Fetch

    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
