const argv = require('yargs-parser')(process.argv.slice(4))
const APP_ENV = argv.env || 'dev'

const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

module.exports = {
    APP_ENV,
    FILE_EXTENSIONS
}