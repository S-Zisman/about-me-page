// Supabase Configuration
const SUPABASE_URL = 'https://rqpxaefeykviuowgrihb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcHhhZWZleWt2aXVvd2dyaWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MTQwNzAsImV4cCI6MjA4MTM5MDA3MH0.fzQuQDBpZ6WxifQBprWzXlBQ5MhwiSR8ouoBqKq1Pr0';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
