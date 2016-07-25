# Structure Core API

## Data

### Get Data from REST

    /api/v0.1/$controllerName/:sid

- `$controllerName` is the name of the controller
- `:sid` is the short ID of the object to get
- `:id` The UUID; is also supported

For example:

    /api/v0.1/templates/a45db4
