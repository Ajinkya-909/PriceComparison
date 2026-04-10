import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Mail, User } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full hero-gradient flex items-center justify-center">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-sm font-mono text-foreground">{user?.id?.slice(0, 8)}...</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}
