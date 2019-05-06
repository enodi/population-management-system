import express from "express";
import {
  createLocation,
  getLocation,
  getSingleLocation,
  updateLocation,
  deleteLocation
} from "../controllers/location";
import { createSubLocation, deleteSubLocation } from "../controllers/subLocation";

const app = express.Router();

app.route("/").post(createLocation);
app.route("/").get(getLocation);
app.route("/:locationId").get(getSingleLocation);
app.route("/:locationId").put(updateLocation);
app.route("/:locationId").delete(deleteLocation);

app.route("/:locationId/subLocation").post(createSubLocation);
app.route("/:locationId/subLocation/:subLocationId").delete(deleteSubLocation);

export default app;
