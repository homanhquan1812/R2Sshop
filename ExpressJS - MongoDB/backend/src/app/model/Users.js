const mongoose = require('mongoose')
// const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const DetailedCourse = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    name: { type: String, ref: 'courses', maxLength: 255, required: true },
    price: { type: Number, ref: 'courses', maxLength: 255, required: true },
    qty: { type: Number, maxLength: 255, required: true },
    totalCost: { type: Number, maxLength: 255, required: true}
})

const Users = new Schema({
    name: { type: String, maxLength: 255, required: true },
    username: { type: String, maxLength: 255, required: true },
    password: { type: String, maxLength: 255, required: true },
    role: { type: String, maxLength: 255, required: true },
    csw_cart: {
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