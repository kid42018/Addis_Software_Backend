const mongoose = require("mongoose");
const SongGeneres = [
  "Pop music",
  "Hip hop music",
  "Rock music",
  "Rhythm and blues",
  "Soul music",
  "Reggae",
  "Country",
  "Funk",
  "Folk music",
  "Middle Eastern music",
  "Jazz",
  "Disco",
  "Classical music",
  "Electronic music",
  "Music of Latin America",
  "Blues",
  "Music for children",
  "New-age music",
  "Vocal music",
  "Music of Africa",
  "Christian music",
  "Music of Asia",
  "Ska",
  "Traditional music",
  "Independent music"
];
const SongSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: [true, 'Song title is required']
    },
    album: { 
      type: String,
      required: [true, 'Song album is required']
     },
    artist: { 
      type: String,
      required: [true, 'Song artist is required']
     },
    gener: { 
      type: String,
      enum:SongGeneres,
      required: [true, 'Song gener is required']
     },
  },
  { timestamps: true }
);
const SongModel = mongoose.model("song", SongSchema);
module.exports = {SongModel,SongGeneres};
