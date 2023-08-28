const CryptoJS= require("crypto-js");
module.exports = (req,res,next)=>{
    try{
        const authHeader= req.get("Authorization");
        console.log(authHeader)
        if(!authHeader) throw new Error("Authorization not present");
        const token = authHeader.split(" ")[1];
        if(!token) throw new Error("token not present");

        const decodedstring= CryptoJS.AES.decrypt(token,process.env.CRYPTO_SECREAT).toString(CryptoJS.enc.Utf8);
        const {email, userId, access} = JSON.parse(decodedstring);

        if(email && userId){
            req.isAuth= true;
            req.userId= userId;
            req.email = email;
            req.access=access;
            next();
        } else{
            throw new Error("Invalid Token")
        }



    }catch(error){
        console.log(error);
        req.isAuth = false;
        next();
    }
}