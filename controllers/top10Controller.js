const {top10}= require("../mongoconfig");
const mongoDb= require("mongodb");

const addtop10 = async(req)=>{
    return top10.insertOne(req.body);
}

const getAlltop10 = (req)=>{
    const { page = 1, count = 10 } = req.query;   
    return top10.find({})
    .skip((parseInt(page) - 1) * parseInt(count))
    .limit(parseInt(count))
    .sort("title","asc").toArray();
};

const gettop10ById = async (req)=>{
    const top10Id = new mongoDb.ObjectId(req.params.top10Id);
    const top10Data = await top10.findOne({_id:top10Id});
    return top10Data;
};

module.exports={addtop10, getAlltop10, gettop10ById}