const http = require('http'),
      app = require('./app')

const PORT = process.env.PORT || 3000

module.exports = {
  start() {
    const server = http.createServer(app)

    server.listen(PORT, (err) => {
      console.log(`[Worker:${process.pid}]`, 'started')
    })
  }
}
