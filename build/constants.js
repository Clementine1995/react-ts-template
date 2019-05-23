const APP_ENV = process.env.NODE_ENV || 'prod'
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

console.log(process.env)

module.exports = {
    APP_ENV,
    FILE_EXTENSIONS
}