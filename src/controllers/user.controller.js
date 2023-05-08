import User from "../models/User.model.js"
import jwtRefreshToken from "../configs/refreshToken.config.js";
import jwtCreateToken from "../configs/createToken.config.js";


//create User
const registerUser = async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({
            email: email
        });
        if (!findUser) {
            const newUser = await User.create(req.body);
            res.status(201).json({
                success: true,
                data: newUser,
            })
        } else {
            throw new Error("Der Benutzer ist bereits vergeben")
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Problem",
            error: error.message,
        })
    }
}

//login User
const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    
    const findUser = await User.findOne({email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await jwtRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id,{
            refreshToken: refreshToken,
        },{new:true})
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            maxAge: 72 *60 *60 *1000,
        })
        res.json({
            _id:findUser?.id,
            username:findUser?.username,
            email:findUser?.email,
            imgUrl: findUser?.imgUrl,
            token:jwtCreateToken(findUser?._id)

        })
    }else{
        res.status(401).json({
            success: false,
            message: "Passwort oder E-Mail sind falsch oder nicht vorhanden",
        });
    }
}
//logout User
const logoutUser = async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken)   res.status(401).json({
        success: false,
        message: "kein Token in Cookie vorhanden",
    });;
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        });
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate(refreshToken,{
        refreshToken:"",
    });
    res.clearCookie("refreshToken", {
        httpOnly:true,
        secure:true
    });
    res.status(204)
}


export  {registerUser, loginUser,logoutUser};