"use strict";

export default function(app) {
  app.use("/api/users", require("./api/routers/user"));
  app.use("/api/user-roles", require("./api/routers/user-role"));
}
