const {Aoriginals}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addAoriginals = async(req)=>{
    return Aoriginals.insertOne(req.body);
}

const getAllAoriginals = (req)=>{
    const { page = 1, count = 10 } = req.query;   
    return Aoriginals.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const getAoriginalsById = async (req)=>{
    const AoriginalsId = new mongoDb.ObjectId(req.params.AoriginalsId);
    const AoriginalsData = await Aoriginals.findOne({_id:AoriginalsId});
    return AoriginalsData;
};

module.exports={addAoriginals, getAllAoriginals, getAoriginalsById}