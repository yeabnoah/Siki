module.exports = {
  apps: [{
    name: 'your-app-name',
    script: './dist/index.js',
    interpreter: 'bun',
    // Other options you might want:
    // instances: 1,
    // watch: true,
    // env: {
    //   NODE_ENV: 'production'
    // }
  }]
} 