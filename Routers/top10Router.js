const {Router}= require("express");

const {addtop10, getAlltop10, gettop10ById} = require("../controllers/top10Controller");

const top10Router = Router();


top10Router.post("/add", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await addtop10(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

top10Router.get("/all", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await getAlltop10(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

top10Router.get("/:top10Id", async(req,res) => {
    try {
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await gettop10ById(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
});

module.exports= top10Router;