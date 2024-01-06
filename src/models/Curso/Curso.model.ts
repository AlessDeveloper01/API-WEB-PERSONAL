import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const courseSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    miniature: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    score: Number
})

courseSchema.plugin(mongoosePaginate);

export const CourseModel = model('Course', courseSchema);