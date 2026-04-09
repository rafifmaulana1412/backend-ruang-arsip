const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.route");
const roleRoutes = require("./modules/role/role.route");
const divisionRoutes = require("./modules/division/division.route");
const letterPriorityRoutes = require("./modules/letter-priority/letterPriority.route");
const documentTypeRoutes = require("./modules/document-type/documentType.route");
const storageRoutes = require("./modules/storage/storage.route");
const userRoutes = require("./modules/user/user.route");
const incomingMails = require("./modules/incoming-mail/incomingMail.route");
const dispositionRoutes = require("./modules/disposition/disposition.route");
const menuRoutes = require("./modules/menus/menus.route");
const digitalDocumentRoutes = require("./modules/digital-documents/digitalDocuments.route");
const outgoingMailRoutes = require("./modules/outgoing-mails/outgoingMails.route");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get("/api/", function (req, res) {
  res.json({
    message: "Welcome sir, this is great start for you!",
    data: "Ruang Arsip Apps",
    version: 1,
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/divisions", divisionRoutes);
app.use("/api/letter-priorities", letterPriorityRoutes);
app.use("/api/document-types", documentTypeRoutes);
app.use("/api/storages", storageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/incoming-mails", incomingMails);
app.use("/api/dispositions", dispositionRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/digital-documents", digitalDocumentRoutes);
app.use("/api/outgoing-mails", outgoingMailRoutes);

module.exports = app;
