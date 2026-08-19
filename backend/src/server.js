const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//  check route if the server is working
app.get("/working", (req, res) => {
    res.json({
        status: "ok",
        message: "AI Conversation Intelligence API is working"
    });
});

// Test Prisma + PostgreSQL connection
app.get("/db-test", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.json({
            status: "ok",
            database: "connected"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            database: "not connected"
        });
    }
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});