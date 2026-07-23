module.exports = {
  apps: [
    {
      name: 'vrgo',
      cwd: './site-1',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      env: { NODE_ENV: 'production', PORT: 3000 }
    },
    {
      name: 'projektorlampacsere',
      cwd: './site-2',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3001',
      env: { NODE_ENV: 'production', PORT: 3001 }
    },
    {
      name: 'offlinebiztonsag',
      cwd: './site-3',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002',
      env: { NODE_ENV: 'production', PORT: 3002 }
    },
    {
      name: 'rendezvenyarnyekolas',
      cwd: './site-4',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3003',
      env: { NODE_ENV: 'production', PORT: 3003 }
    }
  ]
};
