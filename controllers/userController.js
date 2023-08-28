const cryptoJs = require("crypto-js");

const { genSalt, hash, compare } = require("bcrypt");

const sendMail = require("../utils/mailer");
const  { user, token } =require ("../mongoconfig");

const mongoDb= require("mongodb");



const register = async (req) => {

    const userData = await user.find({ email: req.body.email }).toArray();
    if (userData.length) {
        throw new Error("email already registered");
    }
    const { password } = req.body;
    const salt = await genSalt();
    const hashedpass = await hash(password, salt);
    const data = await user.insertOne({
        ...req.body,
        password: hashedpass
    });

    return (data);
};


const login = async (req) => {


    const { email, password } = req.body;
    const userData = await user.find({ email }).toArray();
    if (!userData.length) throw new Error("Email not found");

    const { password: hashedpass, _id, access } = userData[0];
    const checkPass = await compare(password, hashedpass);

    if (!checkPass) throw new Error("wrong credentials");

    const token = cryptoJs.AES.encrypt(JSON.stringify({

        email,
        userId: _id,
        access
    }), process.env.CRYPTO_SECREAT
    ).toString();

    return ({
        userId: _id,
        email,
        token,
    });

};


const loggedInUser = async (req) => {

    const userId = new mongoDb.ObjectId(req.userId);
     const userData = await user.findOne({_id:userId});
    return userData;
    }

const getuser = async (req) => {
    const userId = new mongoDb.ObjectId(req.params.userId);
    return user.findOne({_id:userId})
}

const getAllUser = async (req) => {
    return user.find({}).toArray();
}

const updateUsers = async(req) =>{
    const userId = new mongoDb.ObjectId(req.params.userId);
    return user.findOneAndUpdate({_id:userId},req.body, {new:true}) 
}


const passwordReset= async(req)=>{
    const userData = await user.findOne({email:req.body.email});
    if (!userData.email) throw new Error("Email not found");
    const token =cryptoJs.AES.encrypt(userData._id.toString(),process.env.CRYPTO_SECREAT).toString();
    const date= new Date().getTime();
    sendMail(req.body.email,token);
    return token.insertOne({token,createdAt:date});
}



const verify= async(req) =>{
    const {token} = req.query;
    const tokenData= token.findOne({token});
    if(!tokenData.token) throw new Error("link not found");
    if(token.createdAt +3600000 < new Date().getTime()) throw new Error("link expired");
    const userId = cryptoJs.AES.decrypt(token, process.env.CRYPTO_SECREAT) .toString(cryptoJs.enc.Utf8)
    return {data:true,userId, tokenId: tokenData._id.toString()}
}

const changePass= async (req)=>{
    const {password,userId, tokenId}= req.body;
    const salt = await genSalt();
    const hashPass= await hash(password, salt);
    const tokenn= new mongoDb.ObjectId(tokenId)
    const userrId= new mongoDb.ObjectId(userId)

    await token.findByIdAndDelete({_id:tokenn});
    return user.findOneAndUpdate(
        {_id:userrId},
        {password:hashPass},
        {new:true}
    );
};




module.exports = { register, login, loggedInUser, getuser,getAllUser,updateUsers, passwordReset,verify, changePass }