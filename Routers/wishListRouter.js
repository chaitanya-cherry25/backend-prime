const {Router} = require ("express");

const {addwishList, getwishList} = require("../controllers/wishListControllers");

const wishListRouter = Router();

wishListRouter.post("/add",async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addwishList(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

wishListRouter.get("/userwish", async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getwishList(req);
        res.send(data.map(e => e.value));
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports = wishListRouter;