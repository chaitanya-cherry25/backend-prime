const {Router}= require("express");

const {addMovie, getAllMovies, getMovieById} = require("../controllers/moviesController");

const movieRouter = Router();


movieRouter.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addMovie(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

movieRouter.get("/all", async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAllMovies(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

movieRouter.get("/:movieId", async(req,res) => {
    try {
        // if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getMovieById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= movieRouter;