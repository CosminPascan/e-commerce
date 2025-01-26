const express = require('express')
const router = express.Router()
const perfumeService = require('./perfumeService')
const verifyToken = require('../middlewares/verifyToken')

router.get('/perfumes', verifyToken, perfumeService.getAllPerfumes)
router.post('/perfumes', verifyToken, perfumeService.postPerfume)
router.put('/perfumes/:id', verifyToken, perfumeService.putPerfume)
router.delete('/perfumes/:id', verifyToken, perfumeService.deletePerfume)
router.post('/perfumes/external', perfumeService.postExternalPerfumes)

module.exports = router
