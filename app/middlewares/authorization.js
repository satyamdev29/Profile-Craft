
const authorizeUser = (req, res, next) =>{
    if(req.user.roles.includes('admin')){
        next()
}else {
    res.status('403').send({
        notice: 'the page doesnt exist'
    })
    }
}

module.exports = {
    authorizeUser
}