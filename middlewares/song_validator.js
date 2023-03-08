const {SongModel} = require("../models/song_model");
const ValidateSongDuplicate = async (res,req,next) => {
    try{
        const song = await SongModel.findOne({
            title:req.body?.title ?? "",
            artist:req.body?.artist ?? "",
            gener:req.body?.gener ?? "",
            album:req.body?.album ?? ""
         });
         if(song) return res.status(400).json({success:false,message:"Song already exsists"});
         next();
    }catch (error){
        return res.status(400).json({success:false,message:error.message});
    }
}
module.exports = {ValidateSongDuplicate};