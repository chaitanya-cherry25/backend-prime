const {Router}= require("express");

const {addkDrama, getallkDrama, getkDramaById} = require("../controllers/kdramaController");

const kDramaRouter = Router();


kDramaRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addkDrama(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

kDramaRouter.get("/all", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getallkDrama(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

kDramaRouter.get("/:kDramaId", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getkDramaById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= kDramaRouter;