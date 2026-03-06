import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page, but save the location they were trying to access
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#ECFDF5] to-[#F9FAFB]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    // If already logged in, redirect to home or the intended destination
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
