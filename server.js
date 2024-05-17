const express = require("express");
const path = require("path");
const cors = require("cors");
const os = require("os");

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the root of the project directory
app.use(express.static(path.join(__dirname)));

// Function to get local IP address
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      // Skip over internal (i.e., 127.0.0.1) and non-IPv4 addresses
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// Start the server
app.listen(port, () => {
  const localIp = getLocalIp();
  console.log(`Server is running at http://${localIp}:${port}`);
});
