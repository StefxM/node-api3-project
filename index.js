// code away!
const express = require("express")
const logger = require("./middleware/logger")


const userRouter = require("./users/userRouter")

const server = express()
const port = 5000

server.use(express.json())
server.use(logger())

server.use(userRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });
  

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})