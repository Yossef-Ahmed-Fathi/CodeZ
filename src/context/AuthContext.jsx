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

  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (data.user) {
      // استخدام upsert بدل insert + onConflict
      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          id: data.user.id,
          username: username || email.split('@')[0],
          is_admin: false,
        }, { onConflict: 'id' });

      if (upsertError) {
        console.error('Error upserting user:', upsertError);
      }
    }

    return { data, error };
  };

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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setIsAdmin(false);
    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
