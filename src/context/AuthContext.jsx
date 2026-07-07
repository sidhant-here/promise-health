import { createContext, useContext, useState, useEffect } from 'react';
import { clinicConfig } from '../data/config.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('promiseHealth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem('promiseHealth_user');
    }
  }, []);

  const login = (role, credentials) => {
    if (role === 'doctor') {
      const doctor = clinicConfig.team.find(
        d => d.name === credentials.name
      );
      if (!doctor) return { success: false, error: 'Doctor not found.' };
      if (credentials.password !== clinicConfig.doctorPassword) {
        return { success: false, error: 'Incorrect password.' };
      }
      const userData = { role: 'doctor', ...doctor };
      setUser(userData);
      localStorage.setItem('promiseHealth_user', JSON.stringify(userData));
      return { success: true };
    }

    if (role === 'patient') {
      // Check mock patients first
      let patient = clinicConfig.mockPatients.find(
        p => p.email.toLowerCase() === credentials.email.toLowerCase()
      );
      // Also allow any previously booked patient (stored appointments)
      if (!patient) {
        return { success: false, error: 'No account found with this email. Please book an appointment first.' };
      }
      const userData = { role: 'patient', ...patient };
      setUser(userData);
      localStorage.setItem('promiseHealth_user', JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: 'Invalid role.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('promiseHealth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
