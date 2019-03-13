const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
// let blogs = {
//     // name: [],
//     // email: [],
//     // blog: [],

// }

mongoose.connect('mongodb://localhost/blogss').then(() => {
    console.log(`database connected....`);

}).catch(err => console.error(err))

require('./BlogsSchema');

const blogs = mongoose.model('Blogs');


io.on('connection', socket => {
    console.log(`connected ${socket.id}`);

    socket.on('SendingOneBlog', (data) => {
        console.log(`recieved by ${data.name}`);
        const recieved = {
            name: data.name,
            email: data.email,
            blog: data.blog,
        }

        // blogs.name.push(data.name);
        // blogs.email.push(data.email);
        // blogs.blog.push(data.blog);
        // blogs.push(recieved);


        new blogs(recieved).save().then(what => {
            console.log(`saved..... ${what}`);
            blogs.find({}, (err, res) => {
                console.log(res);
                io.emit('AllBlogs', res);



            });


        }).catch(err => {
            console.error(err);

        })

        // io.emit('AllBlogs', blogs);


    })

    socket.on('disconnection', () => {
        console.log(`disconnected... ${socket.id}`);

    })

})



server.listen(8000, (err) => {
    console.log(`server is running at 3000`);

})