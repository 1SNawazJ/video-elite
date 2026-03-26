import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Profile, ClientProfile, EditorProfile } from "@/types/database.types";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  clientProfile: ClientProfile | null;
  editorProfile: EditorProfile | null;
  loading: boolean;
  isClient: boolean;
  isEditor: boolean;
  isAdmin: boolean;
}

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, metadata: {
    first_name: string;
    last_name: string;
    role: "client" | "editor";
  }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    clientProfile: null,
    editorProfile: null,
    loading: true,
    isClient: false,
    isEditor: false,
    isAdmin: false,
  });

  // Fetch profile data from our profiles table
  const fetchProfile = async (userId: string) => {
    try {
      // Get base profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      let clientProfile: ClientProfile | null = null;
      let editorProfile: EditorProfile | null = null;

      // Fetch role-specific profile
      if (profile.role === "client") {
        const { data } = await supabase
          .from("client_profiles")
          .select("*")
          .eq("user_id", userId)
          .single();
        clientProfile = data;
      } else if (profile.role === "editor") {
        const { data } = await supabase
          .from("editor_profiles")
          .select("*")
          .eq("user_id", userId)
          .single();
        editorProfile = data;
      }

      setState((prev) => ({
        ...prev,
        profile,
        clientProfile,
        editorProfile,
        isClient: profile.role === "client",
        isEditor: profile.role === "editor",
        isAdmin: profile.role === "admin",
      }));
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: session ? true : false, // still loading if we need to fetch profile
      }));

      if (session?.user) {
        fetchProfile(session.user.id).finally(() => {
          setState((prev) => ({ ...prev, loading: false }));
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState((prev) => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setState((prev) => ({
            ...prev,
            profile: null,
            clientProfile: null,
            editorProfile: null,
            isClient: false,
            isEditor: false,
            isAdmin: false,
          }));
        }

        setState((prev) => ({ ...prev, loading: false }));
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auth methods
  const signUp = async (
    email: string,
    password: string,
    metadata: { first_name: string; last_name: string; role: "client" | "editor" }
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata, // This gets passed to our trigger function
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    if (state.user) {
      await fetchProfile(state.user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}