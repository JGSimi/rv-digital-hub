import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'register' | 'forgot-password';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { user, loading } = useAuth();

  // Redirect if already authenticated
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Bem-vindo de volta';
      case 'register':
        return 'Criar nova conta';
      case 'forgot-password':
        return 'Recuperar senha';
      default:
        return 'Autenticação';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'login':
        return 'Entre com suas credenciais para acessar o sistema';
      case 'register':
        return 'Preencha os dados para criar sua conta';
      case 'forgot-password':
        return 'Recupere o acesso à sua conta';
      default:
        return 'Acesse sua conta';
    }
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onToggleMode={() => setMode('register')}
            onForgotPassword={() => setMode('forgot-password')}
          />
        );
      case 'register':
        return <RegisterForm onToggleMode={() => setMode('login')} />;
      case 'forgot-password':
        return <ForgotPasswordForm onBack={() => setMode('login')} />;
      default:
        return null;
    }
  };

  return (
    <AuthLayout title={getTitle()} description={getDescription()}>
      {renderForm()}
    </AuthLayout>
  );
};

export default Auth;