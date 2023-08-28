const {Movies}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addMovie = async(req)=>{
    return Movies.insertOne(req.body);
}

const getAllMovies = (req)=>{
    const { page = 1, count = 40 } = req.query;   
    return Movies.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const getMovieById = async (req)=>{
    const movieId = new mongoDb.ObjectId(req.params.movieId);
    console.log(movieId);
    const movieData = await Movies.findOne({_id:movieId});
    console.log(movieData);
    return movieData;
};



module.exports={addMovie, getAllMovies, getMovieById}