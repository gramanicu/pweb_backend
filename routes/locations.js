const router = require("express").Router
const { PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const locations = await prisma.location.findMany()
    
    res.json(locations)
})


module.exports = router