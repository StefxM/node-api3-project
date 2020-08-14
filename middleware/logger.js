module.exports = () => {
    return (req, res, next) => {// logs the time ran
        const time = new Date().toISOString()
        console.log(`${time} ${req.id} ${req.method} ${req.url}`)
    //were done here move on to the next peice of middleware in the stack
    //(which is the route handler)
    next()
    
    }
}