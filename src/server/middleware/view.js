
const path = require('path')
const fs = require('fs')
function view (app, options) {
  const { baseDir, encoding = 'utf-8' } = options
  app.context.view = function ({file, url}) {
    const filePath = path.join(baseDir, file)
    if (fs.existsSync(filePath)) {
      let template = fs.readFileSync(filePath, encoding)
      this.body = template
    } else {
      this.throw(404)
    }
  }
}

module.exports = view