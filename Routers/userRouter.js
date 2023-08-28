const {Router} = require("express");

const {register, login, loggedInUser, getuser,getAllUser,updateUsers, passwordReset,verify, changePass} = require("../controllers/userController.js")

const userRouter = new Router();

userRouter.post("/register", async (req,res)=>{

    try{
        const data = await register(req);
        res.send(data);
    }catch(error){
        res.send({err:error.message})
    }
})

userRouter.post("/login", async (req,res)=>{

    try{
        const data = await login(req);
        res.send(data);
    }catch(error){
        res.send({err:error.message})
    }
})


userRouter.get("/loggedInUser", async (req,res)=>{
    
    try {
// if(!req.isAuth) throw new Error("Unauthenticated");
const data= await loggedInUser(req);
res.send(data);
    }catch(error){
        res.send({err: error.message});
    }
})

userRouter.get("/get/:userId", async (req,res)=>{
    
    try {
// if(!req.isAuth) throw new Error("Unauthenticated");
const data= await getuser(req);
res.send(data);
    }catch(error){
        res.send({err: error.message});
    }
})

userRouter.get("/getall", async (req,res)=>{
    
    try {
// if(!req.isAuth) throw new Error("Unauthenticated");
const data= await getAllUser(req);
res.send(data);
    }catch(error){
        res.send({err: error.message});
    }
})

userRouter.patch("/:userId", async(req,res)=>{
  
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data= await updateUsers(req);
        res.send(data);
            } catch (error){
                res.send({err: error.message});
            }
})

userRouter.post("/passwordReset", async(req,res)=>{
  
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data= await passwordReset(req);
        res.send(data);
            } catch (error){
                res.send({err: error.message});
            }
})


userRouter.get("/verify", async(req,res)=>{
  
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data= await verify(req);
        res.send(data);
            } catch (error){
                res.send({err: error.message});
            }
})


userRouter.post("/changePass", async(req,res)=>{
  
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data= await changePass(req);
        res.send(data);
            } catch (error){
                res.send({err: error.message});
            }
})
module.exports =userRouter;
