import jwt from "jsonwebtoken"


//erstellt ein refresh json web token 
const refreshToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"2d"})
};

export default refreshToken