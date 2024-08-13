const mongoose = require('mongoose')
// const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const DetailedCourse = new Schema({
    /*
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    */
    name: { type: String, ref: 'courses', maxLength: 255, required: true },
    price: { type: Number, ref: 'courses', maxLength: 255, required: true },
    photo: { type: String, ref: 'courses', required: true }
    // createdAt: { type: Date, default: Date.now }
})

const Users = new Schema({
    name: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true },
    phonenumber: { type: String, maxLength: 255, required: true },
    username: { type: String, maxLength: 255, required: true },
    password: { type: String, maxLength: 255, required: true },
    role: { type: String, maxLength: 255, required: true },
    cart: {
        items: [DetailedCourse], 
        totalPrice: { type: Number, default: 0 }
    }
}, { timestamps: true });

/*
user.plugin(mongoose_delete, { 
    deletedAt: true,
    overrideMethods: 'all'
});
*/

module.exports = mongoose.model('users', Users)