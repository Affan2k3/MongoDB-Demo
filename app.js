const mongoose = require('mongoose')
const express = require('express')

const app = express()
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
    
    // console.log(result)
}


// createCourse()



app.get('/hello', async (req, res) => { // Mark this function as async
    const data = await getCourses(); // Await the promise
    const result = data 
    res.send(data);
    console.log("DDDD", data);
});

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
        // .skip((pageNumber - 1) * pageSize)`
        // .limit(pageSize) 
        // .sort({ date: 1 })`
        // .select({ name: 1, tags: 1 })
    // .count()
    console.log("LLLL",course)
    return course
}


// async function updateCourse(id) {
//     const course = await Course.findById(id)
//     if (!course) return
   
//     course.set({
//         isPublished: false,
//         author: "Affan"
//     })
//     const result = await course.save()
//     console.log(result)
// }

// updateCourse('65ff67f5c92f86e213ccf435')


async function updateCourse(id) {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "NODE",
            isPublished:false
        }

    }, {new: true})
    const ans = await result
    console.log(ans)
}

async function removeCourse(id) {
    const result = await Course.findByIdAndDelete({ _id: id })
    console.log(result)
}

// removeCourse('65ff681406894fa5b10aa2e3')
 


const port = 3000
app.listen(port, () => {    
    console.log(`listening on port ${port}`)
})