// Wait for server to start, then open browser
const { exec } = require('child_process');
const http = require('http');

console.log('⏳ Waiting for server to start...');

// Function to check if server is ready
function checkServer(callback) {
  const req = http.get('http://localhost:3000', (res) => {
    callback(true);
  });
  
  req.on('error', () => {
    callback(false);
  });
  
  req.setTimeout(1000, () => {
    req.destroy();
    callback(false);
  });
}

// Try to open browser when server is ready
let attempts = 0;
const maxAttempts = 30; // 30 seconds max

const interval = setInterval(() => {
  attempts++;
  checkServer((isReady) => {
    if (isReady) {
      clearInterval(interval);
      
      const platform = process.platform;
      let command;
      
      if (platform === 'win32') {
        command = 'start http://localhost:3000';
      } else if (platform === 'darwin') {
        command = 'open http://localhost:3000';
      } else {
        command = 'xdg-open http://localhost:3000';
      }
      
      exec(command, (error) => {
        if (error) {
          console.error('❌ Could not open browser:', error);
        } else {
          console.log('✅ Browser opened at http://localhost:3000');
        }
        // Keep process alive
        setTimeout(() => process.exit(0), 1000);
      });
    } else if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.log('⚠️  Server did not start in time. Please open http://localhost:3000 manually.');
      process.exit(0);
    }
  });
}, 1000); // Check every second

