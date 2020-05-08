const pino = require('pino')
const isProduction = process.env.NODE_ENV === 'production'
const logConfig = {
  prettyPrint: {
    colorize: false,
  },
  level: 'info'
}
if (!isProduction) {
  logConfig.level = 'debug'
  logConfig.prettyPrint = {
    colorize: true,
    translateTime: 'SYS:standard',
  }
}
const logger = pino(logConfig)

module.exports = logger