// require your server and launch it here
const server = require("./api/server.js");
const postRouter =require('./api/posts/posts-router')

server.use('/api/posts', postsRouter)
server.listen(4000,()=>{
    console.log("Serving is running http://localhost:4000)
})