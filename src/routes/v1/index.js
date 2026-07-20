const express=require('express');
const { BookingController } = require('../../controller');
const router=express.Router();
const bookingController=new BookingController();

router.post('/bookings',bookingController.create);
router.post('/publishing',bookingController.sendMessagetoQueue);

module.exports=router;
