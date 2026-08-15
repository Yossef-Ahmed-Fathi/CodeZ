import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setIsAdmin(data.is_admin || false);
      }
    } catch (error) {
      console.log('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser.id);
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  // Sign Up
  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    // إضافة المستخدم في جدول users
    if (data.user) {
      await supabase
        .from('users')
        .insert({
          id: data.user.id,
          username: username || email.split('@')[0],
          is_admin: false,
        })
        .onConflict('id')
        .merge();
    }

    return { data, error };
  };

  // Sign In
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      await checkAdminStatus(data.user.id);
    }

    return { data, error };
  };

  // Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setIsAdmin(false);
    return { error };
  };

  // Update Profile
  const updateProfile = async (updates) => {
    if (!user) return { error: 'No user logged in' };
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    return { data, error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin,
      signUp,
      signIn,
      signOut,
      updateProfile,
      checkAdminStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
