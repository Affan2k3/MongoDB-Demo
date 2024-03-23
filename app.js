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

createCourse()