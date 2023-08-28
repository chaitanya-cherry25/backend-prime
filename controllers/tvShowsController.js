const {tvShows}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addtvShow = async(req)=>{
    
    return tvShows.insertOne(req.body);
}

const getAlltvShows = (req)=>{
    const { page = 1, count = 40 } = req.query;   
    return tvShows.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const getTvShowsById = async (req)=>{
    const tvShowsId = new mongoDb.ObjectId(req.params.tvShowsId);
    const tvShowsData = await tvShows.findOne({_id:tvShowsId});
    return tvShowsData;
};

module.exports={addtvShow, getAlltvShows, getTvShowsById}