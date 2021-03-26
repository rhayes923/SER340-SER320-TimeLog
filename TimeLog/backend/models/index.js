const Course = require('./course')
const Lesson = require('./lesson')
const TimeLog = require('./timeLog')
const Account = require('./account')

const db = {}

db.Course = Course
db.Lesson = Lesson
db.Account = Account
db.TimeLog = TimeLog


module.exports = db