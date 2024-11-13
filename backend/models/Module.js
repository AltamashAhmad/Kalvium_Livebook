const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    topics: [{
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Module', ModuleSchema); 