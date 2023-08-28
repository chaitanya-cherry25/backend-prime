const {Router}= require("express");

const {addupComing, getAllupComing, getupComingById} = require("../controllers/upcomingConntrollers");

const upComingRouter = Router();


upComingRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addupComing(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

upComingRouter.get("/all", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAllupComing(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

upComingRouter.get("/:upComingId", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getupComingById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= upComingRouter;