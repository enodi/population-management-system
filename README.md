# Population Management System - API
Population Management System is a javascript back-end application that models creating locations and retrieving the total number of residents in a particular location.

## Features
* Users can create a location
* Users can retrieve all locations, sublocations and residents within that location
* Users can update a location
* Users can delete locations
* Users can create sub-locations
* Users can delete sub-locations

## Installation and Setup
* Clone this Repo.
* From the root directory, run the following commands:
  to install project dependencies, run
  ```
  npm install
  ```
  to setup database and run migration, run
  ```
  npm run dev:migration
  ```
  to start the application, run
  ```
  npm start
  ```
  to setup test database and run migration, run
  ```
  npm run test:migration
  ```
  to run tests, run
  ```
  npm test
  ```

### Endpoints
Request Type | Endpoint | Action
------------ | -------------  | ------------- 
POST | /api/v1/location | Adds a location to the database
GET | /api/v1/location | Retrieves all locations in the database
GET | /api/v1/location/:locationId  | Retrieves a location, sublocations and the residents of that location
PUT | /api/v1/location/:locationId  | Modifies a location in the database
DELETE | /api/v1/location/:locationId  | removes a location from the database
POST | /api/v1/location/:locationId/subLocation | Adds a sub-location to the database
DELETE | /api/v1/location/:locationId/subLocation/:subLocationId | removes a sub-location from the database

