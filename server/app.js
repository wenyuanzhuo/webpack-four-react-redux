const logger = require('./plugin/log')
const app = require('./init').getInstance()
const systemConfig = require('./init').systemConfig

const appPort = systemConfig.port || 8080
app.listen(appPort, () => logger.info(`🏎  listening on port ${appPort}`))