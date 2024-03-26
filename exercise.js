const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/courses')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(() => {
        console.log('Unable to connect MongoDB')
    })


const courseSchema = new mongoose.Schema({
    _id:String,
    name: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    author: String,
    isPublished: Boolean,
    price: Number,
    __v : Number
})

const courses = [
    {"_id":"5a68fdc3615eda645bc6bdec","tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
    {"_id":"5a68fdd7bee8ea64649c2777","tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
    {"_id":"5a68fde3f09ad7646ddec17e","tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
    {"_id":"5a68fdf95db93f6477053ddd","tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
    {"_id":"5a68fe2142ae6a6482c4c9cb","tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
    {"_id":"5a68ff090c553064a218a547","tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
    {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
]
// const Course = mongoose.model('Course', courseSchema)

const Course = mongoose.model("Course", courseSchema)

// createCourse()
async function createCourse() {

    courses.map(async(i) => {
        const {_id,name,author,tags,isPublished,price,__v} = i
        const course = new Course({
            _id,
            name,
            author,
            tags,
            isPublished,
            price,
            __v,
            
        })
        
        const result = await course.save()
        console.log(result)
    })
    
    }
    
    
    getCourse()
async function getCourse() {
    const courses = await Course
        .find({ isPublished: true})
        .sort({price:-1})
        .select({name: 1, author:1})
    
    console.log(courses)
    }