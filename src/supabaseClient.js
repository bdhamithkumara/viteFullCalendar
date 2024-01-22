import {createClient} from '@supabase/supabase-js'

// const SUPERBASE_URL = process.env.DEV_SUPABASE_URL;
// const SUPERBASE_ANON_KEY = process.env.DEV_SUPABASE_ANON_KEY;

export const supabase = createClient(
  'https://myzqkrpwahslkblblvss.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15enFrcnB3YWhzbGtibGJsdnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5NTkxNzAsImV4cCI6MjAwNDUzNTE3MH0.gPU4YixwHj6pYeOqqoO1rIQNN6cZprFeRjOGQ9SWBlM',
)
