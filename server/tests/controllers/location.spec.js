import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../index";
import db from "../../models";

chai.use(chaiHttp);

describe("Location", () => {
  describe("GET /api/v1/location", () => {
    it("should return 404 error if no location exists", (done) => {
      chai
        .request(app)
        .get("/api/v1/location")
        .then(res => {
          expect(res.body.data.length)
            .to.equal(0);
          expect(res.body.message)
            .to.equal("No location exist at the moment. Create a location to continue");
          expect(res.status).to.equal(404);
          expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });
  before((done) => {
    db.sequelize.sync({ force: true })
      .then(() => {
        done(null);
      })
      .catch((error) => {
        done(error);
      });
  });
  describe("POST /api/v1/location", () => {
    it("should return a success message if location was created successfully", (done) => {
      chai
        .request(app)
        .post("/api/v1/location")
        .send({ name: "Lagos" })
        .then(res => {
          expect(res.body.data.name)
            .to.equal("lagos");
          expect(res.body.message)
            .to.equal("Location created successfully");
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          done();
        });
    });

    it("should return 422 error if location already exists", (done) => {
      chai
        .request(app)
        .post("/api/v1/location")
        .send({ name: "Lagos" })
        .then(res => {
          expect(res.body.message)
            .to.equal("Location: lagos already exists");
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  describe("GET /api/v1/location", () => {
    it("should return success message if a location exists", (done) => {
      chai
        .request(app)
        .get("/api/v1/location")
        .then(res => {
          expect(res.body.data[0].name)
            .to.equal("lagos");
          expect(res.body.message)
            .to.equal("All locations retrieved successfully");
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });

  describe("POST /api/v1/location/:locationId/subLocation", () => {
    it("should return a success message if sublocation was created successfully", (done) => {
      chai
        .request(app)
        .post("/api/v1/location/1/subLocation")
        .send({ name: "Ajao", maleCount: 30, femaleCount: 45 })
        .then(res => {
          expect(res.body.data.name)
            .to.equal("Ajao");
          expect(res.body.message)
            .to.equal("Residents added successfully");
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          done();
        });
    });

    it("should return 404 error if location doesn't exist", (done) => {
      chai
        .request(app)
        .post("/api/v1/location/10/subLocation")
        .send({ name: "Ajao", maleCount: 30, femaleCount: 45 })
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 10 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });

    it("should return 422 error if sublocation already exist", (done) => {
      chai
        .request(app)
        .post("/api/v1/location/1/subLocation")
        .send({ name: "Ajao", maleCount: 30, femaleCount: 45 })
        .then(res => {
          expect(res.body.message)
            .to.equal("Location: Ajao already exists");
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  describe("GET /api/v1/location/:locationId", () => {
    it("should return a success message when returning a single location", (done) => {
      chai
        .request(app)
        .get("/api/v1/location/1")
        .then(res => {
          expect(res.body.data[0].name)
            .to.equal("lagos");
          expect(res.body.message)
            .to.equal("success");
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an("array");
          expect(res.body.totalPopulation).to.equal(75);
          done();
        });
    });
    it("should return 404 error if location doesn't exist", (done) => {
      chai
        .request(app)
        .get("/api/v1/location/10")
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 10 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe("PUT /api/v1/location/:locationId", () => {
    it("should return a success message if location is updated successfully", (done) => {
      chai
        .request(app)
        .put("/api/v1/location/1")
        .send({ name: "Lagos State" })
        .then(res => {
          expect(res.body.data.name)
            .to.equal("Lagos State");
          expect(res.body.message)
            .to.equal("Location updated successfully");
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("should return 404 error if location doesn't exist", (done) => {
      chai
        .request(app)
        .put("/api/v1/location/10")
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 10 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe("DELETE /api/v1/location/:locationId/subLocation/:subLocationId", () => {
    it("should return a success message if sub-location is deleted successfully", (done) => {
      chai
        .request(app)
        .delete("/api/v1/location/1/subLocation/1")
        .then(res => {
          expect(res.body.message)
            .to.equal("Sub-Location with id: 1 was deleted successfully");
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("should return 404 error if location doesn't exist", (done) => {
      chai
        .request(app)
        .delete("/api/v1/location/10/subLocation/1")
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 10 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });
    it("should return 404 error if sub-location doesn't exist", (done) => {
      chai
        .request(app)
        .delete("/api/v1/location/1/subLocation/10")
        .then(res => {
          expect(res.body.message)
            .to.equal("SubLocation with id: 10 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe("DELETE /api/v1/location/:locationId", () => {
    it("should return a success message if location is deleted successfully", (done) => {
      chai
        .request(app)
        .delete("/api/v1/location/1")
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 1 was deleted successfully");
          expect(res.status).to.equal(200);
          done();
        });
    });
    it("should return 404 error if location doesn't exist", (done) => {
      chai
        .request(app)
        .delete("/api/v1/location/1")
        .then(res => {
          expect(res.body.message)
            .to.equal("Location with id: 1 does not exist");
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
