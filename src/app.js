const express = require('express');
const cors = require('cors')
const roleRoutes = require('./modules/role/role.route')
const divisionRoutes = require('./modules/division/division.route')
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/roles", roleRoutes);
app.use("/api/divisions", divisionRoutes);

module.exports = app;