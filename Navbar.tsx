import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Megaphone, 
  ShieldAlert, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Report Issue', href: '/report-issue', icon: Megaphone },
    { name: 'Anti-Ragging', href: '/ragging-report', icon: ShieldAlert },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Megaphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-foreground">
                KITS Ramtek
              </h1>
              <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                Issue Reporting Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                    location === item.href 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </a>
                </Link>
              ))}
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {user.fullName}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 mt-6">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a 
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors",
                            location === item.href 
                              ? "bg-primary/10 text-primary" 
                              : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
