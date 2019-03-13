const mongoose = require('mongoose');
const schema = mongoose.Schema;
//  name: data.name,
// email: data.email,
// blog: data.blog,
const Blogs = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    blog: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Blogs', Blogs);