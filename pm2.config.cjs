module.exports = {
  apps: [
    {
      name: 'postman',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/ubuntu/app',  // Ruta completa a la carpeta de tu aplicación
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};