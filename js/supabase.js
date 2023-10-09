console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://osojjspnzdxxnuycefnk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb2pqc3BuemR4eG51eWNlZm5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTY3NjQsImV4cCI6MjAxMTg5Mjc2NH0.E0wwwloC2dV5X0fnQTMveCC8k5OgNsdfZ6zig1b3ODs'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }