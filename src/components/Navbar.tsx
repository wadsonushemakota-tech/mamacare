import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Baby, Heart, LogOut, User, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary">
              <Heart className="h-6 w-6 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Mama Care
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className="transition-all duration-300"
              >
                Home
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant={isActive("/about") ? "default" : "ghost"}
                className="transition-all duration-300"
              >
                About
              </Button>
            </Link>
            <Link to="/resources">
              <Button 
                variant={isActive("/resources") ? "default" : "ghost"}
                className="transition-all duration-300"
              >
                Resources
              </Button>
            </Link>
            <Link to="/progress">
              <Button 
                variant={isActive("/progress") ? "default" : "ghost"}
                className="transition-all duration-300"
              >
                My Progress
              </Button>
            </Link>
            <Link to="/contact-center">
              <Button 
                variant={isActive("/contact-center") ? "default" : "ghost"}
                className="transition-all duration-300"
              >
                Contact Center
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-6">
                <div className="space-y-3">
                  <Link to="/">
                    <Button variant={isActive("/") ? "default" : "ghost"} className="w-full">
                      Home
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant={isActive("/about") ? "default" : "ghost"} className="w-full">
                      About
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button variant={isActive("/resources") ? "default" : "ghost"} className="w-full">
                      Resources
                    </Button>
                  </Link>
                  <Link to="/progress">
                    <Button variant={isActive("/progress") ? "default" : "ghost"} className="w-full">
                      My Progress
                    </Button>
                  </Link>
                  <Link to="/contact-center">
                    <Button variant={isActive("/contact-center") ? "default" : "ghost"} className="w-full">
                      Contact Center
                    </Button>
                  </Link>
                  {isAuthenticated && user ? (
                    <Button variant="outline" className="w-full" onClick={handleLogout}>
                      Sign Out
                    </Button>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/auth">
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/auth?mode=signup">
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary">Get Started</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.userType === "doctor" 
                      ? `Dr. ${user.name || user.email}` 
                      : (user.name || user.email)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user.userType === "doctor" 
                          ? `Dr. ${user.name || "User"}` 
                          : (user.name || "User")}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.userType === "patient" && user.trimester && (
                        <p className="text-xs text-muted-foreground capitalize">
                          {user.trimester} Trimester
                        </p>
                      )}
                      {user.userType === "doctor" && (
                        <p className="text-xs text-muted-foreground">Doctor</p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="hidden sm:flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
