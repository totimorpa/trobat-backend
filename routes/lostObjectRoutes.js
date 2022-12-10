const express = require("express");
const { route } = require("./root");
const router = express.Router();
const lostObjectsController = require("../controllers/lostObjectsController");

router
  .route("/")
  .get(lostObjectsController.getAllLostObjects)
  .post(lostObjectsController.createNewLostObject)
  .patch(lostObjectsController.updateLostObject)
  .delete(lostObjectsController.deleteLostObject);

module.exports = router;
