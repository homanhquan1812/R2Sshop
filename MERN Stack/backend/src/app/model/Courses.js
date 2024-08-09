const mongoose = require('mongoose')
// const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Courses = new Schema({
    name: { type: String, maxLength: 255, required: true },
    price: { type: Number, maxLength: 255, required: true },
    duration: { type: Number, maxLength: 255, required: true },
    number_of_students: { type: Number, maxLength: 255, required: true },
    description: { type: String, required: true },
    type: { type: String, maxLength: 255, required: true },
    photo: { type: String, required: true }
}, { timestamps: true });

/*
Course.plugin(mongoose_delete, { 
    deletedAt: true,
    overrideMethods: 'all'
});
*/

module.exports = mongoose.model('courses', Courses)