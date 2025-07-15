const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Station name is required"],
      trim: true,
      maxlength: [100, "Station name cannot exceed 100 characters"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: [true, "Station coordinates are required"],
        validate: {
          validator: function (coordinates) {
            return (
              coordinates.length === 2 &&
              coordinates[0] >= -180 &&
              coordinates[0] <= 180 && // long
              coordinates[1] >= -90 &&
              coordinates[1] <= 90
            ); // lat
          },
          message:
            "Invalid coordinates. Longitude must be between -180 and 180, latitude between -90 and 90",
        },
      },
    },
    address: {
      type: String,
      required: [true, "Station address is required"],
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City name cannot exceed 50 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//  2d sphere index
stationSchema.index({ location: "2dsphere" });

//  text index
stationSchema.index({
  name: "text",
  address: "text",
  city: "text",
});

stationSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

module.exports = mongoose.model("Station", stationSchema);
