const mongoose = require('mongoose')
// const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const DetailedCourse = new Schema({
    /*
    courseId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    */
    name: { type: String, maxLength: 255, required: true },
    price: { type: Number, maxLength: 255, required: true },
    photo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

const Orders = new Schema({
    name: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true },
    phonenumber: { type: String, maxLength: 255, required: true },
    cart: {
        items: [DetailedCourse], 
        totalPrice: { type: Number, default: 0 }
    },
    status: { type: Boolean, required: true },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
}, { timestamps: true });

/*
user.plugin(mongoose_delete, { 
    deletedAt: true,
    overrideMethods: 'all'
});
*/

module.exports = mongoose.model('orders', Orders)