const express = require('express')
const router = express.Router()
const perfumeService = require('./perfumeService')
const perfumeValidationRules = require('../validators/perfumeValidator')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')

router.get('/perfumes', verifyToken, perfumeService.getAllPerfumes)
router.get('/perfumes/first-batch', verifyToken, perfumeService.getFirstBatch)
router.get('/perfumes/next-batch/:id', verifyToken, perfumeService.getNextBatch)
router.post('/perfumes', perfumeValidationRules, validate, verifyToken, perfumeService.postPerfume)
router.put('/perfumes/:id', perfumeValidationRules, validate, verifyToken, perfumeService.putPerfume)
router.delete('/perfumes/:id', verifyToken, perfumeService.deletePerfume)
router.post('/perfumes/external', perfumeService.postExternalPerfumes)

module.exports = router
