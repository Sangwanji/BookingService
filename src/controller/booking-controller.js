const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../service");
const { createChannel,publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingServiceInstance=new BookingService();

class BookingController{
    // constructor(channel){
        // this.channel=channel;
    // }

    async sendMessagetoQueue(req,res){
        const channel=await createChannel();
        const payload={
            data:{
                subject:'This is notification from queue',
                content:'Some queue will subscribe this',
                recepientEmail:'losted882005@gmail.com',
                notificationTime: '2026-07-20T19:05:00.000'
            },
            service:'CREATE_TICKET'
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message:'Succesfully published the event'
        })
    }
    async create(req,res){
        try {
            const response=await bookingServiceInstance.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message:"Successfully completed booking",
                success:true,
                err:{},
                data:response
            });
        } catch (error) {
            return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                message:error.message,
                success:false,
                err:error.explanation,
                data:{}
            });
        }
    }
}
module.exports=BookingController