export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      awards: {
        Row: {
          award_date: string
          badge_icon: string | null
          category: string
          created_at: string
          criteria_met: string[] | null
          description: string | null
          id: string
          match_id: string | null
          points_awarded: number | null
          recipient_player_id: string | null
          recipient_team_name: string | null
          recipient_type: string | null
          sport: string | null
          title: string
          tournament_id: string | null
        }
        Insert: {
          award_date?: string
          badge_icon?: string | null
          category: string
          created_at?: string
          criteria_met?: string[] | null
          description?: string | null
          id?: string
          match_id?: string | null
          points_awarded?: number | null
          recipient_player_id?: string | null
          recipient_team_name?: string | null
          recipient_type?: string | null
          sport?: string | null
          title: string
          tournament_id?: string | null
        }
        Update: {
          award_date?: string
          badge_icon?: string | null
          category?: string
          created_at?: string
          criteria_met?: string[] | null
          description?: string | null
          id?: string
          match_id?: string | null
          points_awarded?: number | null
          recipient_player_id?: string | null
          recipient_team_name?: string | null
          recipient_type?: string | null
          sport?: string | null
          title?: string
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awards_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_recipient_player_id_fkey"
            columns: ["recipient_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          clock_running: boolean | null
          created_at: string
          current_half: number | null
          current_innings: number | null
          current_overs: number | null
          current_quarter: number | null
          current_set: number | null
          game_clock_minutes: number | null
          game_clock_seconds: number | null
          id: string
          live_updates: boolean | null
          shot_clock_running: boolean | null
          shot_clock_seconds: number | null
          sport: string
          status: string
          team_a_balls_faced: number | null
          team_a_batsman_outs: number | null
          team_a_fouls: number | null
          team_a_games_current_set: number | null
          team_a_name: string
          team_a_red_cards: number | null
          team_a_score: number
          team_a_sets: number | null
          team_b_balls_faced: number | null
          team_b_batsman_outs: number | null
          team_b_fouls: number | null
          team_b_games_current_set: number | null
          team_b_name: string
          team_b_red_cards: number | null
          team_b_score: number
          team_b_sets: number | null
          updated_at: string
        }
        Insert: {
          clock_running?: boolean | null
          created_at?: string
          current_half?: number | null
          current_innings?: number | null
          current_overs?: number | null
          current_quarter?: number | null
          current_set?: number | null
          game_clock_minutes?: number | null
          game_clock_seconds?: number | null
          id?: string
          live_updates?: boolean | null
          shot_clock_running?: boolean | null
          shot_clock_seconds?: number | null
          sport: string
          status?: string
          team_a_balls_faced?: number | null
          team_a_batsman_outs?: number | null
          team_a_fouls?: number | null
          team_a_games_current_set?: number | null
          team_a_name: string
          team_a_red_cards?: number | null
          team_a_score?: number
          team_a_sets?: number | null
          team_b_balls_faced?: number | null
          team_b_batsman_outs?: number | null
          team_b_fouls?: number | null
          team_b_games_current_set?: number | null
          team_b_name: string
          team_b_red_cards?: number | null
          team_b_score?: number
          team_b_sets?: number | null
          updated_at?: string
        }
        Update: {
          clock_running?: boolean | null
          created_at?: string
          current_half?: number | null
          current_innings?: number | null
          current_overs?: number | null
          current_quarter?: number | null
          current_set?: number | null
          game_clock_minutes?: number | null
          game_clock_seconds?: number | null
          id?: string
          live_updates?: boolean | null
          shot_clock_running?: boolean | null
          shot_clock_seconds?: number | null
          sport?: string
          status?: string
          team_a_balls_faced?: number | null
          team_a_batsman_outs?: number | null
          team_a_fouls?: number | null
          team_a_games_current_set?: number | null
          team_a_name?: string
          team_a_red_cards?: number | null
          team_a_score?: number
          team_a_sets?: number | null
          team_b_balls_faced?: number | null
          team_b_batsman_outs?: number | null
          team_b_fouls?: number | null
          team_b_games_current_set?: number | null
          team_b_name?: string
          team_b_red_cards?: number | null
          team_b_score?: number
          team_b_sets?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string
          created_by: string | null
          highlights: string[] | null
          id: string
          match_date: string
          match_duration_minutes: number | null
          match_type: string | null
          sport: string
          status: string | null
          team_a_name: string
          team_a_score: number | null
          team_b_name: string
          team_b_score: number | null
          updated_at: string
          venue: string | null
          winner_team: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          highlights?: string[] | null
          id?: string
          match_date?: string
          match_duration_minutes?: number | null
          match_type?: string | null
          sport: string
          status?: string | null
          team_a_name: string
          team_a_score?: number | null
          team_b_name: string
          team_b_score?: number | null
          updated_at?: string
          venue?: string | null
          winner_team?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          highlights?: string[] | null
          id?: string
          match_date?: string
          match_duration_minutes?: number | null
          match_type?: string | null
          sport?: string
          status?: string | null
          team_a_name?: string
          team_a_score?: number | null
          team_b_name?: string
          team_b_score?: number | null
          updated_at?: string
          venue?: string | null
          winner_team?: string | null
        }
        Relationships: []
      }
      player_match_stats: {
        Row: {
          assists: number | null
          blocks: number | null
          created_at: string
          fouls: number | null
          id: string
          match_id: string | null
          minutes_played: number | null
          performance_rating: number | null
          player_id: string | null
          points_scored: number | null
          rebounds: number | null
          steals: number | null
          team_name: string
        }
        Insert: {
          assists?: number | null
          blocks?: number | null
          created_at?: string
          fouls?: number | null
          id?: string
          match_id?: string | null
          minutes_played?: number | null
          performance_rating?: number | null
          player_id?: string | null
          points_scored?: number | null
          rebounds?: number | null
          steals?: number | null
          team_name: string
        }
        Update: {
          assists?: number | null
          blocks?: number | null
          created_at?: string
          fouls?: number | null
          id?: string
          match_id?: string | null
          minutes_played?: number | null
          performance_rating?: number | null
          player_id?: string | null
          points_scored?: number | null
          rebounds?: number | null
          steals?: number | null
          team_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_match_stats_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "player_match_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          achievements: string[] | null
          avatar_url: string | null
          bio: string | null
          course: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          height_cm: number | null
          id: string
          jersey_number: number | null
          name: string
          phone: string | null
          position: string | null
          preferred_sports: string[] | null
          registration_status: string | null
          student_id: string | null
          total_matches_played: number | null
          total_wins: number | null
          updated_at: string
          user_id: string | null
          weight_kg: number | null
          year_of_study: number | null
        }
        Insert: {
          achievements?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          name: string
          phone?: string | null
          position?: string | null
          preferred_sports?: string[] | null
          registration_status?: string | null
          student_id?: string | null
          total_matches_played?: number | null
          total_wins?: number | null
          updated_at?: string
          user_id?: string | null
          weight_kg?: number | null
          year_of_study?: number | null
        }
        Update: {
          achievements?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          course?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          height_cm?: number | null
          id?: string
          jersey_number?: number | null
          name?: string
          phone?: string | null
          position?: string | null
          preferred_sports?: string[] | null
          registration_status?: string | null
          student_id?: string | null
          total_matches_played?: number | null
          total_wins?: number | null
          updated_at?: string
          user_id?: string | null
          weight_kg?: number | null
          year_of_study?: number | null
        }
        Relationships: []
      }
      team_registrations: {
        Row: {
          captain_player_id: string | null
          id: string
          payment_status: string | null
          player_ids: string[] | null
          registration_date: string
          status: string | null
          team_name: string
          tournament_id: string | null
        }
        Insert: {
          captain_player_id?: string | null
          id?: string
          payment_status?: string | null
          player_ids?: string[] | null
          registration_date?: string
          status?: string | null
          team_name: string
          tournament_id?: string | null
        }
        Update: {
          captain_player_id?: string | null
          id?: string
          payment_status?: string | null
          player_ids?: string[] | null
          registration_date?: string
          status?: string | null
          team_name?: string
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_registrations_captain_player_id_fkey"
            columns: ["captain_player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_registrations_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          contact_email: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string
          entry_fee: number | null
          id: string
          max_teams: number | null
          name: string
          prize_pool: number | null
          registration_deadline: string | null
          rules: string[] | null
          sport: string
          start_date: string
          status: string | null
          tournament_format: string | null
          updated_at: string
          venue: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date: string
          entry_fee?: number | null
          id?: string
          max_teams?: number | null
          name: string
          prize_pool?: number | null
          registration_deadline?: string | null
          rules?: string[] | null
          sport: string
          start_date: string
          status?: string | null
          tournament_format?: string | null
          updated_at?: string
          venue?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string
          entry_fee?: number | null
          id?: string
          max_teams?: number | null
          name?: string
          prize_pool?: number | null
          registration_deadline?: string | null
          rules?: string[] | null
          sport?: string
          start_date?: string
          status?: string | null
          tournament_format?: string | null
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
