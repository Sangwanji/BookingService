const express=require('express');
const { BookingController } = require('../../controller');
const router=express.Router();
const bookingController=new BookingController();


router.get('/testing',async (req,res)=>{
    return res.json({
        message:"In bookingroutes"
    })
})
router.post('/bookings',bookingController.create);
router.post('/publishing',bookingController.sendMessagetoQueue);

module.exports=router;
