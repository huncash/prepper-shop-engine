module.exports = {
  apps: [
    {
      name: 'vrgo',
      cwd: './site-1',
      script: 'npm',
      args: 'run start',
      env: { NODE_ENV: 'production', PORT: 3000 }
    },
    {
      name: 'projektorlampacsere',
      cwd: './site-2',
      script: 'npm',
      args: 'run start',
      env: { NODE_ENV: 'production', PORT: 3001 }
    },
    {
      name: 'offlinebiztonsag',
      cwd: './site-3',
      script: 'npm',
      args: 'run start',
      env: { NODE_ENV: 'production', PORT: 3002 }
    },
    {
      name: 'rendezvenyarnyekolas',
      cwd: './site-4',
      script: 'npm',
      args: 'run start',
      env: { NODE_ENV: 'production', PORT: 3003 }
    }
  ]
};
