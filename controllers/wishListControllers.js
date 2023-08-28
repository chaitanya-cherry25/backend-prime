const { wishList, user} = require("../mongoconfig");
const mongoDb = require("mongodb");

const addwishList = async(req)=>{
    const wishlistData= await wishList.insertOne(req.body);
    const wishlistId = wishlistData.insertedId.toString();

    const usersId= new mongoDb.ObjectId(req.body.userId);
    return user.findOneAndUpdate({_id:usersId},{
        $push:{
            wishList:wishlistId
        }
    });
}

const getwishList = async(req)=>{
    const usersId= new mongoDb.ObjectId(req.query.userId);
    const userData = await user.findOne({_id:usersId});
    console.log(req.body);
    const wishlistIds = userData.wishList;
    const wlPromise = wishlistIds.map((e) =>{
        const wId= new mongoDb.ObjectId(e);
        return wishList.findOne({_id:wId})
    }); //{if(e.type=="movie")return movidedetailsapicall if()}
    return Promise.allSettled(wlPromise);
}


module.exports = {addwishList, getwishList};