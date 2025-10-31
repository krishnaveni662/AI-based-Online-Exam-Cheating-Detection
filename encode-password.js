// Helper script to URL-encode your MongoDB password
// Usage: node encode-password.js "YourPassword"

const password = process.argv[2];

if (!password) {
  console.error('❌ Usage: node encode-password.js "YourPassword"');
  console.error('\nExample:');
  console.error('  node encode-password.js "MyP@ss/word"');
  console.error('\nOutput: MyP%40ss%2Fword');
  process.exit(1);
}

const encoded = encodeURIComponent(password);
console.log('\n📝 Original password:', password);
console.log('🔐 Encoded password:', encoded);
console.log('\n✅ Use this encoded password in your .env file');
console.log('\nExample MONGO_URI:');
console.log(`mongodb+srv://senapathikrishnaveni662_db_user:${encoded}@cluster0.rsvvpi7.mongodb.net/hackhub?retryWrites=true&w=majority\n`);

