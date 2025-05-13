
// A simple in-memory authentication system for development

// Mock user store
const users: Record<string, { 
  id: string; 
  email: string; 
  password: string;
  role?: 'user' | 'admin';
  userType?: 'buyer' | 'seller';
}> = {};

// Mock session
let currentUser: { 
  id: string; 
  email: string; 
  role?: 'user' | 'admin';
  userType?: 'buyer' | 'seller';
} | null = null;

// Event listeners for auth state changes
type AuthChangeCallback = (user: typeof currentUser) => void;
const listeners: AuthChangeCallback[] = [];

// Helper to trigger auth state change
const notifyAuthChange = () => {
  listeners.forEach(callback => callback(currentUser));
};

export const mockAuth = {
  // Sign up
  signUp: async (email: string, password: string, userType: 'buyer' | 'seller') => {
    if (users[email]) {
      throw new Error('User already exists');
    }
    
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    users[email] = {
      id,
      email,
      password,
      role: 'user',
      userType
    };
    
    currentUser = {
      id,
      email,
      role: 'user',
      userType
    };
    
    notifyAuthChange();
    
    return { user: currentUser };
  },
  
  // Sign in
  signIn: async (email: string, password: string) => {
    const user = users[email];
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    currentUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      userType: user.userType
    };
    
    notifyAuthChange();
    
    return { user: currentUser };
  },
  
  // Sign out
  signOut: async () => {
    currentUser = null;
    notifyAuthChange();
    return { error: null };
  },
  
  // Get current session
  getSession: async () => {
    return { 
      data: { 
        session: currentUser ? { user: currentUser } : null
      } 
    };
  },
  
  // Get current user
  getUser: async () => {
    return { 
      data: { 
        user: currentUser 
      } 
    };
  },
  
  // Subscribe to auth changes
  onAuthStateChange: (callback: AuthChangeCallback) => {
    listeners.push(callback);
    
    // Return unsubscribe function
    return {
      subscription: {
        unsubscribe: () => {
          const index = listeners.indexOf(callback);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        }
      }
    };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!currentUser;
  }
};
