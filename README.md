# Structure Core API

## Getting Started

### Requirements

If you don't have RethinkDB installed:

    brew install rethinkdb

Then install Node.js modules:

    npm install

### Running

To start the project:

Run a RethinkDB instance by running:

    rethinkdb

Then start the API server:

    npm start


## Data

### Get Data from REST

    /api/v0.1/$controllerName/:sid

- `$controllerName` is the name of the controller
- `:sid` is the short ID of the object to get
- `:id` The UUID; is also supported

For example:

    /api/v0.1/templates/a45db4
