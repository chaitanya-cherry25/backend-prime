const {kDrama}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addkDrama = async(req)=>{
    return kDrama.insertOne(req.body);
}

const getallkDrama = (req)=>{
    const { page = 1, count = 10 } = req.query;   
    return kDrama.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const getkDramaById = async (req)=>{
    const kDramaId = new mongoDb.ObjectId(req.params.kDramaId);
    const kDramaData = await kDrama.findOne({_id:kDramaId});
    return kDramaData;
};

module.exports={addkDrama, getallkDrama, getkDramaById}