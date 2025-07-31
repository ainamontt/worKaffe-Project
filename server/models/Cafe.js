const mongoose = require("mongoose");

const cafeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      // Para búsquedas geográficas, will need mongosh
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        // [longitud, latitud]
        type: [Number],
        required: true,
      },
    },
    description: {
      //descripcon leve
      type: String,
      maxlength: 500,
    },
    wifiAvailability: {
      type: Boolean,
      default: false,
    },
    wifiSpeed: {
      // 1-5, o Mbps talvez no lo necesitemos, no esta working now
      type: Number,
      min: 1,
      max: 5,
    },
    powerOutlets: {
      type: Boolean,
      default: false,
    },
    hasFood: {
      type: Boolean,
      default: false,
    },
    hasCoffee: {
      type: Boolean,
      default: true,
    },
    openingHours: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    isPetFriendly: {
      type: Boolean,
    },
    hasTerrace: {
      type: Boolean,
    },
    isQuiet: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true, //createdAt y updatedAt
  }
);

//GeoJSON para búsquedas por proximidad
cafeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Cafe", cafeSchema);
