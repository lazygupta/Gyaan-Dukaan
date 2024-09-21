const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ObjectId = mongoose.ObjectId

const userSchema = new Schema ({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const adminSchema = new Schema ({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const courseSchema = new Schema ({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

// const courseContent = new Schema ({
//     courseId: ObjectId
// })

const purchaseSchema = new Schema ({
    courseId: ObjectId,
    userId: ObjectId,
})

const userModel = mongoose.model("users" , userSchema)
const adminModel = mongoose.model("admin" , adminSchema)
const courseModel = mongoose.model("courses", courseSchema)
const purchaseModel = mongoose.model("purchases" , purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}