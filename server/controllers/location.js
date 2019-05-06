import db from "../models";

export const createLocation = (req, res) => {
  let { name } = req.body;
  name = name.toLowerCase();

  db.Location.findOne({
    where: { name }
  }).then(locationExists => {
    if (locationExists) {
      return res.status(422).json({ message: `Location: ${name} already exists` });
    }
    db.Location.create({ name })
      .then(data => {
        return res.status(201).json({
          message: "Location created successfully",
          data
        });
      })
      .catch(error => res.status(500).json(error));
  });
}

export const getLocation = (req, res) => {
  db.Location.findAll()
    .then(data => {
      if (data.length === 0) {
        return res.status(404).json({
          message: "No location exist at the moment. Create a location to continue",
          data
        });
      }
      return res.status(200).json({
        message: "All locations retrieved successfully",
        data
      });
    })
    .catch(error => res.status(500).json(error));
}

export const getSingleLocation = (req, res) => {
  const id = parseInt(req.params.locationId);
  db.Location.findByPk(id)
    .then(location => {
      if (!location) {
        return res.status(404).json({
          message: `Location with id: ${id} does not exist`
        });
      }

      db.Location.findAll({
        where: { id },
        include: [
          { model: db.SubLocation, as: "subLocations" }
        ]
      }).then((locations) => {
        const subLocations = locations[0].subLocations;
        let totalFemale = 0, totalMale = 0, totalPopulation = 0;
        subLocations.forEach(subLocation => {
          totalFemale += subLocation.femaleCount;
          totalMale += subLocation.maleCount;
          totalPopulation = totalFemale + totalMale;
        });
        return res.status(200).json({
          message: "success",
          data: locations,
          totalFemale,
          totalMale,
          totalPopulation
        });
      }).catch(error => res.status(500).json(error));
    });
}

export const updateLocation = (req, res) => {
  const id = parseInt(req.params.locationId);
  const { name } = req.body;

  db.Location.findByPk(id)
    .then(location => {
      if (!location) {
        return res.status(404).json({
          message: `Location with id: ${id} does not exist`
        });
      }
      location.update({ name })
        .then(() => {
          return res.status(200).json({
            message: "Location updated successfully",
            data: location
          });
        })
        .catch(error => res.status(500).json(error));
    });
}

export const deleteLocation = (req, res) => {
  const id = parseInt(req.params.locationId);

  db.Location.findByPk(id)
    .then(location => {
      if (location === null) {
        return res.status(404).json({
          message: `Location with id: ${id} does not exist`
        });
      }
      location.destroy();
      return res.status(200).json({
        message: `Location with id: ${id} was deleted successfully`
      });
    })
    .catch(error => res.status(500).json(error));
}

