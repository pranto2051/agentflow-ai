import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2];
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase Connection...');
  
  try {
    // We can fetch OpenAPI spec from Supabase to list all tables
    const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
    const spec = await res.json();
    
    if (spec.paths) {
      const paths = Object.keys(spec.paths).filter(p => p !== '/');
      const tables = paths.map(p => p.split('/')[1]);
      const uniqueTables = [...new Set(tables)];
      
      console.log('Available tables/endpoints in the database:', uniqueTables);
      
      if (uniqueTables.length === 0) {
        console.log('No tables found in the database. Are you sure you have created tables in the public schema?');
      }
      
      // Try to fetch 5 rows from each table
      for (const table of uniqueTables) {
        if (table === 'rpc') continue; // Skip RPC endpoints
        console.log(`\nFetching data from table: ${table}`);
        const { data, error } = await supabase.from(table).select('*').limit(5);
        if (error) {
          console.error(`Error fetching ${table}:`, error.message);
        } else {
          console.log(`Data from ${table} (first ${data.length} rows):`, JSON.stringify(data, null, 2));
        }
      }
    } else {
      console.log('Could not retrieve tables from OpenAPI spec. Using pg connection might be required.');
      console.log('Spec received:', Object.keys(spec));
      if (spec.error) console.log(spec);
    }
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
  }
}

testConnection();
