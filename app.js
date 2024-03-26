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
    author: "Affan Ahmed",
    tags: ['node', 'Frontend'],
    isPublished: true,
})

    
    const result = await course.save()
    console.log(result)
}


// createCourse()




async function getCourses() {
    const pageNumber = 4;
    const pageSize = 1
    const course = await Course
        
    
        
        //   STARTS WITH 
        // .find({ author: /Affan/ })
 
        //   ENDS WITH 
        // .find({ author: /Ahmed$/i })
        
        
        //   INCLUDE
        // .find({ author: /.*ahmed.*/i })

        
        
        // .find({ author: "Affan" })
        // .find({price: { $gte : 10, $lte: 20}})
        // .find({price:{ $in:[10,15,20]}})
        // .and([{author :"Affan"}, { isPublished:true}])
        
        
        .find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize) 
        .sort({ date: 1 })
        // .select({ name: 1, tags: 1 })
    // .count()
    console.log(course)
}



getCourses()

