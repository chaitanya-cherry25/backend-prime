const {Router}= require("express");

const {addAoriginals, getAllAoriginals, getAoriginalsById} = require("../controllers/AoriginalsController");

const AoriginalsRouter = Router();


AoriginalsRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addAoriginals(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

AoriginalsRouter.get("/all", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAllAoriginals(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

AoriginalsRouter.get("/:AoriginalsId", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAoriginalsById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= AoriginalsRouter;