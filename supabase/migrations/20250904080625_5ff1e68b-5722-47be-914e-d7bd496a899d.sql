-- Update check constraints to match form values

-- Drop existing check constraints
ALTER TABLE inspection_logs DROP CONSTRAINT IF EXISTS inspection_logs_honey_stores_check;
ALTER TABLE inspection_logs DROP CONSTRAINT IF EXISTS inspection_logs_brood_pattern_check;
ALTER TABLE inspection_logs DROP CONSTRAINT IF EXISTS inspection_logs_population_estimate_check;
ALTER TABLE inspection_logs DROP CONSTRAINT IF EXISTS inspection_logs_queen_status_check;
ALTER TABLE inspection_logs DROP CONSTRAINT IF EXISTS inspection_logs_temperament_check;

-- Add updated check constraints that match the form values
ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_honey_stores_check 
CHECK (honey_stores = ANY (ARRAY['abundant'::text, 'good'::text, 'adequate'::text, 'low'::text, 'critical'::text]));

ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_brood_pattern_check 
CHECK (brood_pattern = ANY (ARRAY['excellent'::text, 'good'::text, 'fair'::text, 'poor'::text, 'spotty'::text, 'none'::text]));

ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_population_estimate_check 
CHECK (population_estimate = ANY (ARRAY['very_strong'::text, 'strong'::text, 'moderate'::text, 'weak'::text, 'very_weak'::text]));

ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_queen_status_check 
CHECK (queen_status = ANY (ARRAY['present'::text, 'present_poor'::text, 'missing'::text, 'new'::text, 'queen_cells'::text]));

ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_temperament_check 
CHECK (temperament = ANY (ARRAY['calm'::text, 'docile'::text, 'active'::text, 'defensive'::text, 'aggressive'::text]));

-- Also add weather conditions check constraint
ALTER TABLE inspection_logs ADD CONSTRAINT inspection_logs_weather_conditions_check 
CHECK (weather_conditions = ANY (ARRAY['sunny_calm'::text, 'sunny_windy'::text, 'partly_cloudy'::text, 'overcast'::text, 'light_rain'::text, 'cold'::text]));