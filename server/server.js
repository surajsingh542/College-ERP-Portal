const express = require("express");
const globalErrHandler = require("./middlewares/globalErrHandler");
require("./config/dbConnect");
const cors = require("cors");
const adminRoutes = require("./routes/admin/adminRoutes");
const facultyRoutes = require("./routes/faculty/facultyRoutes");
const studentRoutes = require("./routes/student/studentRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors middleware
app.use(cors());

// routes

// admin routes
app.use("/api/v1/admin", adminRoutes);

// faculty routes
app.use("/api/v1/faculty", facultyRoutes);

// student routes
app.use("/api/v1/student", studentRoutes);

// Error handlers
app.use(globalErrHandler);

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
