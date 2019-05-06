import db from "../models";

export const createSubLocation = (req, res) => {
  const { name, maleCount, femaleCount } = req.body;
  const { locationId } = req.params;

  db.Location.findByPk(locationId)
    .then((locationExist) => {
      if (!locationExist) {
        return res.status(404).json({
          message: `Location with id: ${locationId} does not exist`
        });
      }
      db.SubLocation.findOne({
        where: { name }
      }).then(nameExists => {
        if (nameExists) {
          return res.status(422).json({ message: `Location: ${name} already exists` });
        }
        return db.SubLocation.create({ name, maleCount, femaleCount, locationId })
          .then(data => {
            res.status(201).json({
              message: "Residents added successfully",
              data
            });
          })
          .catch(error => res.status(500).json(error));
      })
  });
}

export const deleteSubLocation= (req, res) => {
  const id= parseInt(req.params.locationId);
  const subId = parseInt(req.params.subLocationId);

  db.Location.findByPk(id)
    .then(location => {
      if (location === null) {
        return res.status(404).json({
          message: `Location with id: ${id} does not exist`
        });
      }
      db.SubLocation.findByPk(subId)
        .then(subLocation => {
          if (subLocation === null) {
            return res.status(404).json({
              message: `SubLocation with id: ${subId} does not exist`
            });
          }
          subLocation.destroy();
          return res.status(200).json({
            message: `Sub-Location with id: ${subId} was deleted successfully`
          });
        });
    })
    .catch(error => res.status(500).json(error));
}
