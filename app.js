const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => {
        console.log("Connected to MongoDB...")
    })
    .catch((err) => {
        console.log("Could'nt connect to MongoDB", err)
    })

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
    
const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
const course = new Course({
    name: "NextJS",
    author: "Affan",
    tags: ['node', 'Frontend'],
    isPublished: true,
})

    
    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    const course = await Course
        // .find({ author: "Affan", tags: ['node', "Frontend"] })
        // .find({price: { $gte : 10, $lte: 20}})
        // .find({price:{ $in:[10,15,20]}})
        .find()
        .and([{author :"Affan"}, { isPublished:true}])
        .limit(10) 
        .sort({ date: 1 })
        // .select({ name: 1, tags: 1 })
    console.log(course)
}



getCourses()