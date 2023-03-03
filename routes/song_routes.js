const router = require("express").Router();
const {getSongs,addSong,updateSong,deleteSong,getGeners, getStats} = require("../controllers/song_controller");
router.route("/").get(getSongs).post(addSong);
router.route("/:id").put(updateSong).delete(deleteSong);
router.get("/stats",getStats);
router.get("/geners",getGeners);
module.exports = router;