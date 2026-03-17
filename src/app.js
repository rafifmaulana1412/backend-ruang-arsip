const express = require('express');
const cors = require('cors')
const authRoutes = require('./modules/auth/auth.route')
const roleRoutes = require('./modules/role/role.route')
const divisionRoutes = require('./modules/division/division.route')
const letterPriorityRoutes = require('./modules/letter-priority/letterPriority.route')
const documentTypeRoutes = require('./modules/document-type/documentType.route')
const storageRoutes = require('./modules/storage/storage.route')
const userRoutes = require('./modules/user/user.route')
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/login", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/divisions", divisionRoutes);
app.use("/api/letter-priorities", letterPriorityRoutes);
app.use("/api/document-types", documentTypeRoutes);
app.use("/api/storages", storageRoutes);
app.use("/api/users", userRoutes);

module.exports = app;