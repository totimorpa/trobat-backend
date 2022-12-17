const User = require("../models/User");
const LostObject = require("../models/LostObject");
const asyncHandler = require("express-async-handler");

// @desc Get all lostObjects
// @route GET /lostObjects
// @access Private
const getAllLostObjects = asyncHandler(async (req, res) => {
  // Get all lostObjects from MongoDB
  const lostObjects = await LostObject.find().lean();

  // If no lostObjects
  if (!lostObjects?.length) {
    return res.status(400).json({ message: "No Lost Objects found" });
  }

  // Add username to each lostObject before sending the response
  //   const lostObjectsWithUser = await Promise.all(
  //     lostObjects.map(async (lostObject) => {
  //       const user = await User.findById(lostObject.user).lean().exec();
  //       return { ...lostObjects, username: user.username };
  //     })
  //   );

  res.json(lostObjects);
});

// @desc Create new lostObject
// @route POST /lostObjects
// @access Private
const createNewLostObject = asyncHandler(async (req, res) => {
  const {
    user,
    title,
    text,
    picture,
    dateFound,
    categories,
    lloc,
    telefon,
    recollida,
  } = req.body;

  // Confirm data
  if (
    !user ||
    !title ||
    !text ||
    !dateFound ||
    !categories ||
    !lloc ||
    !telefon ||
    !recollida
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate lostObject
  //   const duplicate = await LostObject.findOne({ title }).lean().exec();

  //   if (duplicate) {
  //     return res.status(409).json({ message: "Duplicate lostObject" });
  //   }

  // Create and store the new lostObject
  const lostObject = await LostObject.create({
    user,
    title,
    text,
    picture,
    dateFound,
    categories,
    lloc,
    telefon,
    recollida,
  });

  if (lostObject) {
    // Created
    return res.status(201).json({ message: "New Lost Object created" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid Lost Object data received" });
  }
});

// @desc Update a lostObject
// @route PATCH /lostObjects
// @access Private
const updateLostObject = asyncHandler(async (req, res) => {
  const {
    id,
    user,
    title,
    text,
    picture,
    dateFound,
    categories,
    lloc,
    telefon,
    recollida,
  } = req.body;

  // Confirm data
  if (!id || !user || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm lostObject exists to update
  const lostObject = await LostObject.findById(id).exec();

  if (!lostObject) {
    return res.status(400).json({ message: "Lost Object not found" });
  }

  // Check for duplicate lostObject
  //   const duplicate = await LostObject.findOne({ title }).lean().exec();

  // Allow renaming of the original lostObject
  //   if (duplicate && duplicate?._id.toString() !== id) {
  //     return res.status(409).json({ message: "Duplicate lostObject title" });
  //   }

  lostObject.user = user;
  lostObject.title = title;
  lostObject.text = text;
  lostObject.picture = picture;
  lostObject.dateFound = dateFound;
  lostObject.retreived = retreived;
  lostObject.categories = categories;
  lostObject.lloc = lloc;
  lostObject.telefon = telefon;
  lostObject.recollida = recollida;

  const updatedLostObject = await lostObject.save();

  res.json(`'${updatedLostObject.title}' updated`);
});

// @desc Delete a lostObject
// @route DELETE /lostObjects
// @access Private
const deleteLostObject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Lost Object ID required" });
  }

  // Confirm lostObject exists to delete
  const lostObject = await LostObject.findById(id).exec();

  if (!lostObject) {
    return res.status(400).json({ message: "Lost Object not found" });
  }

  const result = await lostObject.deleteOne();

  const reply = `LostObject '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllLostObjects,
  createNewLostObject,
  updateLostObject,
  deleteLostObject,
};
