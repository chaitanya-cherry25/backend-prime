const {upComing}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addupComing = async(req)=>{
    return upComing.insertOne(req.body);
}

const getAllupComing = (req)=>{
    const { page = 1, count = 10 } = req.query;   
    return upComing.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const getupComingById = async (req)=>{
    const upComingId = new mongoDb.ObjectId(req.params.upComingId);
    const upComingData = await upComing.findOne({_id:upComingId});
    return upComingData;
};

module.exports={addupComing, getAllupComing, getupComingById}