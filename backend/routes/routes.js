const express = require('express')
const {getCountry,uploadFile,getStates, getCities, getCitiesWi, getStatesWi} = require('./../controllers/address') 
const {saveData,getUsersData, getUser, updateData} = require('../controllers/registration')
const router = express.Router()

router.route('/').get(getCountry);
router.route('/states/:id').get(getStates);
router.route('/cities/:id').get(getCities);
router.route('/').post(uploadFile);
router.route('/forCity').get(getCitiesWi)
router.route('/forState').get(getStatesWi)

router.route('/insertData').post(saveData);
router.route('/updateData/:id').post(updateData)
router.route('/getUsersData').get(getUsersData)
router.route('/getUser/:id').get(getUser)

module.exports = router;