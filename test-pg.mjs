import pg from 'pg';
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

const dbUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});

async function checkDatabase() {
  console.log('Connecting via Postgres...');
  try {
    const client = await pool.connect();
    
    // Query to list all tables in the public schema
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = result.rows.map(row => row.table_name);
    console.log('Tables in public schema:', tables);
    
    if (tables.length === 0) {
      console.log('Your database has no tables in the public schema.');
    } else {
      for (const table of tables) {
        console.log(`\nFetching data from ${table}...`);
        try {
          const dataRes = await client.query(`SELECT * FROM public."${table}" LIMIT 5`);
          console.log(`Data from ${table} (first ${dataRes.rows.length} rows):`, JSON.stringify(dataRes.rows, null, 2));
        } catch (err) {
          console.error(`Error reading from ${table}:`, err.message);
        }
      }
    }
    
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await pool.end();
  }
}

checkDatabase();
