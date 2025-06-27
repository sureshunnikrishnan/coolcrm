require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  encryptionKey: process.env.ENCRYPTION_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Validate essential configuration
if (!config.databaseUrl) {
  console.error("FATAL ERROR: DATABASE_URL is not defined.");
  process.exit(1);
}

if (!config.encryptionKey) {
  console.error("FATAL ERROR: ENCRYPTION_KEY is not defined.");
  process.exit(1);
}

module.exports = config;
