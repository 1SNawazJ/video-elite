export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          avatar_url: string | null;
          bio: string | null;
          role: "client" | "editor" | "admin";
          status: "active" | "pending" | "suspended";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };

      client_profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string | null;
          plan: "starter" | "growth" | "agency";
          minutes_total: number;
          minutes_used: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["client_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["client_profiles"]["Insert"]>;
      };

      editor_profiles: {
        Row: {
          id: string;
          user_id: string;
          level: number;
          grading_score: number;
          points_balance: number;
          total_earned: number;
          portfolio_url: string | null;
          specializations: string[] | null;
          experience_years: number;
          stripe_account_id: string | null;
          stripe_connected: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["editor_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["editor_profiles"]["Insert"]>;
      };

      projects: {
        Row: {
          id: string;
          client_id: string;
          editor_id: string | null;
          title: string;
          description: string | null;
          style: string[] | null;
          status: "open" | "assigned" | "in_progress" | "delivered" | "in_review" | "completed" | "cancelled";
          budget_min: number | null;
          budget_max: number | null;
          final_price: number | null;
          minutes_estimate: number | null;
          video_length: string | null;
          industry: string | null;
          deadline: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };

      applications: {
        Row: {
          id: string;
          project_id: string;
          editor_id: string;
          price_offer: number;
          portfolio_url: string | null;
          cover_message: string | null;
          points_spent: number;
          status: "pending" | "accepted" | "rejected";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["applications"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
      };

      messages: {
        Row: {
          id: string;
          project_id: string;
          sender_id: string;
          content: string;
          message_type: "text" | "file" | "system";
          file_url: string | null;
          file_name: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };

      project_files: {
        Row: {
          id: string;
          project_id: string;
          uploaded_by: string;
          file_type: "raw_footage" | "deliverable" | "brief" | "asset";
          file_name: string;
          file_url: string;
          file_size: number | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["project_files"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["project_files"]["Insert"]>;
      };

      payments: {
        Row: {
          id: string;
          project_id: string;
          client_id: string;
          editor_id: string;
          amount: number;
          platform_fee: number;
          editor_payout: number;
          status: "held" | "pending" | "released" | "refunded";
          stripe_payment_intent_id: string | null;
          released_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["payments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };

      points_transactions: {
        Row: {
          id: string;
          editor_id: string;
          amount: number;
          type: "purchase" | "application" | "refund" | "bonus";
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["points_transactions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["points_transactions"]["Insert"]>;
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          body: string | null;
          link: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
    };
  };
}

// Helper types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ClientProfile = Database["public"]["Tables"]["client_profiles"]["Row"];
export type EditorProfile = Database["public"]["Tables"]["editor_profiles"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Application = Database["public"]["Tables"]["applications"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type ProjectFile = Database["public"]["Tables"]["project_files"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type PointsTransaction = Database["public"]["Tables"]["points_transactions"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];