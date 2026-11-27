import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <AppRoutes />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                border: '1px solid #E5E9EF',
                color: '#202936',
              },
            }}
          />
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
