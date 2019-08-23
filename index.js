const cluster = require('cluster'),
      os = require('os'),
      server = require('./server')

const numCPUs = os.cpus().length

if (cluster.isMaster) {
  console.log('[Master]', 'running')

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`[Worker:${worker.process.pid}]`, 'died')
  })
} else {
  server.start()
}
