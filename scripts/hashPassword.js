#!/usr/bin/env node

/**
 * Password Hashing Utility
 *
 * Usage:
 *   node scripts/hashPassword.js "your-password-here"
 *   npm run hash-password "your-password-here"
 *
 * This will output a SHA-256 hash that you can use in your .env.local file.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Get password from command line argument
const password = process.argv[2];

if (!password) {
  console.error('❌ Error: No password provided\n');
  console.log('Usage:');
  console.log('  node scripts/hashPassword.js "your-password-here"');
  console.log('  npm run hash-password "your-password-here"\n');
  console.log('Example:');
  console.log('  node scripts/hashPassword.js "mySecurePassword123"');
  process.exit(1);
}

const hash = hashPassword(password);

console.log('\n✅ Password hashed successfully!\n');
console.log('Original password:');
console.log(`  ${password}\n`);
console.log('SHA-256 hash (add this to .env.local):');
console.log(`  ${hash}\n`);
console.log('Example .env.local entry:');
console.log(`  PRODUCT_GLOBAL_PASSWORD=${hash}\n`);
