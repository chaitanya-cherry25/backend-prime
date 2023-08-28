const {Router}= require("express");

const {addtvShow, getAlltvShows, getTvShowsById} = require("../controllers/tvShowsController");

const tvShowsRouter = Router();


tvShowsRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        // console.log(req)
        const data = await addtvShow(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

tvShowsRouter.get("/all", async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAlltvShows(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

tvShowsRouter.get("/:tvShowsId", async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getTvShowsById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= tvShowsRouter;