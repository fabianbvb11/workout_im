import { supa } from "../js/supabase_config.js";


console.log("00 JavaScript verbunden")

// 1. **Alle Filme abrufen**: Hole alle Spalten aller Filme aus der Tabelle `movies`.

async function selectAllusers() {
    const { data, error } = await supa.from("userdata").select();
  
    return data;
  }

console.log('Alle User in der DB: ', selectAllusers());