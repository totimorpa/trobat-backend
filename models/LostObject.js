const mongoose = require("mongoose");

const lostObjectSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://cdn4.iconfinder.com/data/icons/airport-and-travel-2/85/lost_and_found_missing_object-512.png",
    },

    dateFound: {
      type: Date,

      required: true,
    },
    retreived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostObject", lostObjectSchema);
