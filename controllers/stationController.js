const Station = require("../models/Station");

const getAllStations = async (req, res, next) => {
  try {
    const stations = await Station.find();

    res.status(200).json({
      status: "success",
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    next(error);
  }
};

const getStationByQuery = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      return next(new apiError("Please provide a name to search for", 400));
    }

    const query = {
      isActive: true,
      name: { $regex: name, $options: "i" },
    };

    const stations = await Station.find(query);

    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations,
    });
  } catch (error) {
    next(error);
  }
};

const getStationById = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({
        status: "fail",
        message: "Station not found",
      });
    }

    res.status(200).json({
      success: true,
      data: station,
    });
  } catch (error) {
    next(error);
  }
};

const createStation = async (req, res, next) => {
  try {
    const station = await Station.create(req.body);

    res.status(201).json({
      success: true,
      message: "Station created successfully",
      data: station,
    });
  } catch (error) {
    next(error);
  }
};

const updateStation = async (req, res, next) => {
  try {
    let station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!station) {
      return res.status(404).json({
        status: "fail",
        message: "Station not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Station updated successfully",
      data: station,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStation = async (req, res, next) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);

    if (!station) {
      return res.status(404).json({
        status: "fail",
        message: "Station not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Station deleted successfully",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const getNearestStations = async (req, res, next) => {
  try {
    const { latlng } = req.params;
    const [lat, lng] = latlng.split(",").map(Number);

    if (!lat || !lng) {
      return next(
        new AppError(
          "Please provide latitude and longitude in the format lat,lng.",
          400
        )
      );
    }

    const maxDistance = 1000; // m

    //  1: Find up to 2 active tours within 1000m
    let nearbyTours = await Station.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: maxDistance,
        },
      },
      { $match: { isActive: true } },
      { $sort: { distance: 1 } },
      { $limit: 2 },
      {
        $project: {
          name: 1,
          location: {
            coordinates: 1,
          },
          distance: 1,
        },
      },
    ]);

    //  2: If fewer than 2, get the single nearest active tour
    if (nearbyTours.length < 2) {
      nearbyTours = await Station.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [lng, lat],
            },
            distanceField: "distance",
            spherical: true,
          },
        },
        { $match: { isActive: true } },
        { $sort: { distance: 1 } },
        { $limit: 1 },
        {
          $project: {
            name: 1,
            location: {
              coordinates: 1,
            },
            distance: 1,
          },
        },
      ]);
    }

    // Format distances
    nearbyTours.forEach((tour) => {
      const dist = tour.distance;
      tour.distance =
        dist < 500 ? `${Math.round(dist)} m` : `${(dist / 1000).toFixed(2)} km`;
    });

    res.status(200).json({
      status: "success",
      results: nearbyTours.length,
      data: {
        data: nearbyTours,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStations,
  getStationByQuery,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  getNearestStations,
};
