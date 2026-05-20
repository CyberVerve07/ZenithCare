'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { auth, isFirebaseEnabled } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    let finalEmail = email.trim();
    let finalPassword = password || '';

    const keyMap: Record<string, [string, string]> = {
      'MED-ADM-777': ['admin@mediflow.com', 'admin123'],
      'MED-DOC-888': ['doctor@mediflow.com', 'doctor123'],
      'MED-NUR-999': ['nurse@mediflow.com', 'nurse123'],
      'MED-STF-111': ['staff@mediflow.com', 'staff123'],
    };

    if (keyMap[finalEmail.toUpperCase()]) {
      const mapped = keyMap[finalEmail.toUpperCase()];
      finalEmail = mapped[0];
      finalPassword = mapped[1];
    }

    const validCredentials: Record<string, string> = {
      'admin@mediflow.com': 'admin123',
      'doctor@mediflow.com': 'doctor123',
      'nurse@mediflow.com': 'nurse123',
      'staff@mediflow.com': 'staff123',
    };

    // 1. Try Firebase Authentication first if configured in environmental keys
    if (isFirebaseEnabled && auth) {
      try {
        console.log('[useAuth] Firebase is enabled. Authenticating with Firebase...');
        const userCredential = await signInWithEmailAndPassword(auth, finalEmail, finalPassword);
        const token = await userCredential.user.getIdToken();
        
        // Store token so that headers interceptor picks it up for subsequent requests
        localStorage.setItem('token', token);
        
        // Fetch PostgreSQL role and name from our backend using verified token
        const { data } = await api.get('/auth/me');
        const userObj = {
          ...data.user,
          name: data.user.name || data.user.full_name || 'Dr. Attending Doctor',
          full_name: data.user.full_name || data.user.name || 'Dr. Attending Doctor'
        };

        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        router.push('/dashboard');
        return;
      } catch (err: any) {
        console.error('[useAuth] Firebase email/password login failed:', err.message);
        throw new Error(err.code ? `[Firebase Auth]: ${err.message}` : 'Firebase credentials incorrect.');
      }
    }

    // 2. Local backend Express API fallback (for local development or local Postgres setup)
    try {
      console.log('[useAuth] Firebase not configured. Falling back to local Express database auth...');
      const { data } = await api.post('/auth/login', { email: finalEmail, password: finalPassword });
      
      const userObj = {
        ...data.user,
        name: data.user.name || data.user.full_name || 'Dr. Attending Doctor',
        full_name: data.user.full_name || data.user.name || 'Dr. Attending Doctor'
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);
      router.push('/dashboard');
    } catch (err: any) {
      console.warn('[useAuth] Local Express login offline or failed. Checking offline mock credentials...');
      
      // 3. Local Mock Offline Login Fallback
      if (validCredentials[finalEmail] && validCredentials[finalEmail] === finalPassword) {
        const role = finalEmail === 'admin@mediflow.com' ? 'Admin' :
                     finalEmail === 'doctor@mediflow.com' ? 'Doctor' :
                     finalEmail === 'nurse@mediflow.com' ? 'Nurse' : 'Staff';
        const name = finalEmail === 'admin@mediflow.com' ? 'Dr. Sarah Admin' :
                     finalEmail === 'doctor@mediflow.com' ? 'Dr. Attending Doctor' :
                     finalEmail === 'nurse@mediflow.com' ? 'Nurse Florence' : 'Support Staff';
        
        const mockUser = {
          id: 'demo-id-' + role.toLowerCase(),
          email: finalEmail,
          role: role,
          name: name,
          full_name: name
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-demo-token');
        setUser(mockUser);
        router.push('/dashboard');
      } else {
        throw new Error('Invalid clinician passkey credentials.');
      }
    }
  };

  const loginWithGoogle = async () => {
    // 1. If Firebase is configured, execute real Google Sign-In pop-up
    if (isFirebaseEnabled && auth) {
      try {
        console.log('[useAuth] Triggering Google Sign-In Popup via Firebase...');
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const token = await userCredential.user.getIdToken();
        
        localStorage.setItem('token', token);
        
        // Fetch or create/signup Postgres profile automatically on the backend
        const { data } = await api.get('/auth/me');
        const userObj = {
          ...data.user,
          name: data.user.name || data.user.full_name || 'Dr. Attending Doctor',
          full_name: data.user.full_name || data.user.name || 'Dr. Attending Doctor'
        };

        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        router.push('/dashboard');
        return;
      } catch (err: any) {
        console.error('[useAuth] Google Sign-In failed:', err.message);
        throw new Error(err.code ? `[Google Auth]: ${err.message}` : 'Google authentication failed.');
      }
    }

    // 2. Offline Google Login Mock Fallback (for development speed & testing)
    console.log('[useAuth] Google login is offline or Firebase is unconfigured. Simulating mock Google login...');
    const mockGoogleUser = {
      id: 'demo-id-google-oauth',
      email: 'doctor@mediflow.com',
      role: 'Doctor',
      name: 'Dr. Attending Doctor (OAuth Mock)',
      full_name: 'Dr. Attending Doctor (OAuth Mock)'
    };
    
    localStorage.setItem('token', 'mock-google-oauth-token');
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    setUser(mockGoogleUser);
    router.push('/dashboard');
  };

  const logout = async () => {
    try {
      if (isFirebaseEnabled && auth) {
        await firebaseSignOut(auth);
      }
    } catch (err: any) {
      console.warn('[useAuth] Firebase signout warning:', err.message);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/mis/login');
  };

  return { user, loading, login, loginWithGoogle, logout };
};
