const Express = require("express");

const cors = require("cors")

require("dotenv").config();

const Auth = require("./middlewares/Auth");

const userRouter = require("./Routers/userRouter");
const movieRouter = require("./Routers/moviesRouter");
const tvShowsRouter= require("./Routers/tvShowsRouter")
const top10Router = require("./Routers/top10Router");
const upComingRouter= require("./Routers/upcomingRouter");
const AoriginalsRouter= require("./Routers/AoriginalsRouter");
const kDramaRouter= require("./Routers/kdramaRouter");
const wishListRouter=require("./Routers/wishListRouter");
const paymentRouter = require("./Routers/PaymentRouter");

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(Auth);
app.use(cors());

app.use("/user", userRouter);
app.use("/movies",movieRouter);
app.use("/tvshows",tvShowsRouter);
app.use("/top10",top10Router);
app.use("/upComing",upComingRouter);
app.use("/Aoriginals",AoriginalsRouter);
app.use("/kDrama",kDramaRouter);
app.use("/wishList",wishListRouter);
app.use("/payment",paymentRouter);

app.listen(4000, ()=> console.log("server running at port 4000"));