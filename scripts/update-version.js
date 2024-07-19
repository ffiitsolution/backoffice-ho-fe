const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const versionJsonPath = path.join(__dirname, '../src/assets/version.json');

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    process.exit(1);
  }
  const packageJson = JSON.parse(data);
  const versionInfo = { version: packageJson.version };

  fs.writeFile(versionJsonPath, JSON.stringify(versionInfo, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing version.json:', err);
      process.exit(1);
    }
    console.log('version.json file has been updated successfully.');
  });
});
