const {ValidateSongDuplicate} = require("../middlewares/song_validator");
const router = require("express").Router();
const {getSongs,addSong,updateSong,deleteSong,getGeners, getStats} = require("../controllers/song_controller");
router.route("/").get(getSongs).post(ValidateSongDuplicate,addSong);
router.route("/:id").put(ValidateSongDuplicate, updateSong).delete(deleteSong);
router.get("/stats",getStats);
router.get("/geners",getGeners);
module.exports = router;