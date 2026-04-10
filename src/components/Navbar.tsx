import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
// import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-8 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            PriceDekho
          </span>
        </Link>

        {/* Desktop */}
        {/* <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
          <SearchBar className="w-full" />
        </div> */}

        <div className="hidden md:flex items-center gap-3">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile" className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                <User className="h-5 w-5" />
              </Link>
              <button onClick={handleSignOut} className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hero-gradient text-primary-foreground text-sm font-medium transition-opacity hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
          {/* <SearchBar className="w-full" /> */}
          <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">
                Profile
              </Link>
              <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="block text-sm text-muted-foreground hover:text-foreground">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-primary font-medium">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
