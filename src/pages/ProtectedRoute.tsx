import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthority } = useAuth();
  if (loading) return null;
  if (!user || !isAuthority) return <Navigate to="/" replace />;
  return <>{children}</>;
}


