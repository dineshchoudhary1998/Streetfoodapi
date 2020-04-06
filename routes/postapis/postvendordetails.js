const express = require('express')
const router = express.Router()
const Vendordetails =require('../../models/vendorSchema')

// Creating one vendor
router.post('/', async (req, res) => {
    const vendordetails = new Vendordetails(req.body)
  
    try {
      const newvendor = await vendordetails.save()
      res.status(201).json(newvendor)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

module.exports = router 