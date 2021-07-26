const path = require('path')
const cwd = process.cwd()

module.exports = {
  '**/*.md': (paths) => {
    return paths
      .map((file) => path.relative(cwd, file))
      .map((filename) => `./node_modules/.bin/markdown-toc -i '${filename}'`)
  }
}
