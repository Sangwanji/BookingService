const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../service");

const bookingServiceInstance=new BookingService();

const create = async(req,res)=>{
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

module.exports={
    create
}