const {SongModel,SongGeneres} = require("../models/song_model");
async function getSongs(req,res){
    try {
        const songs = await SongModel.find();
        res.status(201).json({success:true,data:songs});
      } catch (error) {
        res.status(400).json({success:false,message:error.message});
      }
}
async function getStats(req,res){
    try {
        const totals = await SongModel.aggregate([
            {
                $group: {
                  _id: null,
                  title: { $addToSet: "$title" },
                  album: { $addToSet: "$album" },
                  artist: { $addToSet: "$artist" },
                  gener: { $addToSet: "$gener" }
                }
              },
              {
                $project: {
                  _id: 0,
                  title: { $size: "$title" },
                  album: { $size: "$album" },
                  artist: { $size: "$artist" },
                  gener: { $size: "$gener" }
                }
              }
       ]);
      
        const noOfSongsInEachGener = await SongModel.aggregate([
             {
                $group:{ 
                    _id: "$gener",
                    totalSongs: { $sum: 1 }
                 }
            },
            {
            $project: {
                _id: 0,
                gener:"$_id",
                totalSongs:"$totalSongs"
              }
            }
        ]);
        const noOfSongsInEachAlbum = await SongModel.aggregate([
            {
               $group:{ 
                   _id: "$album",
                   totalSongs: { $sum: 1 }
                }
           },  {
            $project: {
                _id: 0,
                album:"$_id",
                totalSongs:"$totalSongs"
              }
            }
       ]);
    const noOfSongsInEachArtist = await SongModel.aggregate([
        {
        $group:{ 
            _id: "$artist",
            totalSongs: { $sum: 1 }
            }
        },{
            $project: {
                _id: 0,
                artist:"$_id",
                totalSongs:"$totalSongs"
              }
            }
    ]);
    const noOfAlbumAndSongInEachArtist = await SongModel.aggregate([
            {
            $group:{ 
                _id: "$artist",
                album: { $addToSet: "$album" },
                title: { $addToSet: "$title" },
                }
        }, {
            $project: {
                _id: 0,
                artist:"$_id",
                totalAlbums: { $size: "$album" },
                totalSongs: { $size: "$title" },
            }
        }
        ]);

    
        res.status(200).json({success:true,data:{
            totals,
            noOfSongsInEachArtist,
            noOfSongsInEachGener,
            noOfSongsInEachAlbum,
            noOfAlbumAndSongInEachArtist,
        }});
      } catch (error) {
        res.status(500).json({success:false,message:error.message});
      }   
}
async function addSong(req,res){
    try {
        await SongModel.create(req.body);
        res.status(201).json({success:true,message:"Song Created Successfully"});
      } catch (error) {
        res.status(400).json({success:false,message:error.message});
      }
}
async function updateSong(req,res){
    try {
        const {id} = req.params;
        const song =   await SongModel.findById(id);
        if(song){
            await SongModel.findByIdAndUpdate(id, req.body, {runValidators: true,});
           return res.status(201).json({success:true,message:"Song Updated Successfully"});  
        }
        return  res.status(400).json({success:false,message:"Song not found"});
      } catch (error) {
        return res.status(400).json({success:false,message:error.message});
      }
}
async function deleteSong(req,res){
    try {
        const {id} = req.params;
        const song =   await SongModel.findById(id);
        if(song){
            await SongModel.findByIdAndDelete(id);
           return res.status(201).json({success:true,message:"Song Deleted Successfully"});  
        }
        return  res.status(400).json({success:false,message:"Song not found"});
      } catch (error) {
        return res.status(400).json({success:false,message:error.message});
      }
}
async function getGeners(req,res){
    return res.status(200).json({success:true,data:SongGeneres})
}
module.exports = {
    getSongs,
    getStats,
    addSong,
    updateSong,
    deleteSong,
    getGeners
}