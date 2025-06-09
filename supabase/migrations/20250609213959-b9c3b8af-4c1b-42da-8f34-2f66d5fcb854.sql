-- Add missing columns for cricket tracking
ALTER TABLE public.games 
ADD COLUMN team_a_balls_faced INTEGER DEFAULT 0,
ADD COLUMN team_b_balls_faced INTEGER DEFAULT 0,
ADD COLUMN current_innings INTEGER DEFAULT 1;

-- Add missing columns for football tracking  
ALTER TABLE public.games
ADD COLUMN team_a_red_cards INTEGER DEFAULT 0,
ADD COLUMN team_b_red_cards INTEGER DEFAULT 0;