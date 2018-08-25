const router = require("express").Router();
const newsfeedPostController = require("./newsfeedPostController");

router.post("/", newsfeedPostController.post);
router.get("/", newsfeedPostController.readAll);
router.get("/public/:userbaseId/:offset", newsfeedPostController.getAllPublic);
router.get("/private/:userbaseId/:offset", newsfeedPostController.getAllPrivate);
router.get("/:id", newsfeedPostController.readById);
router.put("/:id", newsfeedPostController.update);
router.delete("/:id", newsfeedPostController.deleteById);

module.exports = router;