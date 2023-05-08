import jwt from"jsonwebtoken"

//erstellt ein jwt token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

export default createToken