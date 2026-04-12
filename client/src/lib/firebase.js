/**
 * firebase.js — Firebase App Initialization
 * ==========================================
 * Project: nistha-passi-core
 */

import { initializeApp } from 'firebase/app';
import { getAnalytics }  from 'firebase/analytics';
import { getFirestore }  from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            'AIzaSyALUloNt0HWTMeP4IARvRMS9JY-R5_NnFM',
  authDomain:        'nistha-passi-core.firebaseapp.com',
  projectId:         'nistha-passi-core',
  storageBucket:     'nistha-passi-core.firebasestorage.app',
  messagingSenderId: '299692286010',
  appId:             '1:299692286010:web:f9fbb02169500828aa5503',
  measurementId:     'G-R3WSHC7JE5',
};

export const app       = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db        = getFirestore(app);

