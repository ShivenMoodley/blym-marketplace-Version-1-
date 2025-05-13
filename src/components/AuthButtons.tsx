
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

const AuthButtons: React.FC = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
            {user.email}
          </div>
          <DropdownMenuSeparator />
          {user.userType === 'seller' && (
            <DropdownMenuItem asChild>
              <Link to="/seller/dashboard">Seller Dashboard</Link>
            </DropdownMenuItem>
          )}
          {user.userType === 'buyer' && (
            <DropdownMenuItem asChild>
              <Link to="/buyer/dashboard">Buyer Dashboard</Link>
            </DropdownMenuItem>
          )}
          {isAdmin() && (
            <DropdownMenuItem asChild>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild>
        <Link to="/auth?tab=signin">Sign In</Link>
      </Button>
      <Button variant="default" className="bg-black hover:bg-gray-800" asChild>
        <Link to="/auth?tab=signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
