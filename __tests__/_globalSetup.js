const { runMigration } = require('./_utils')

module.exports = async (globalSetup) => {
  if (!globalSetup.testPathPattern.includes('uni')) await runMigration();
}