module.exports = {
  apps: [{
    name: "your-app-name",
    script: "./dist/index.js",
    interpreter: "bun",
    env: {
      NODE_ENV: "production",
    }
  }]
} 