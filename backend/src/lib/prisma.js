// we need to connect the prisma client to server 

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;