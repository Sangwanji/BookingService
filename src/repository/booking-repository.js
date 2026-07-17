const { StatusCodes } = require('http-status-codes');
const {Booking}=require('../models/index');
const { ValidationError,AppError } = require('../utils/errors');

class BookingRepository{
    async create(data){
        try {
            const booking=await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name=='sequelizeValidationError') throw new ValidationError(error);
            throw new AppError('Repository Error','Can not create a booking','There was some issue in creating a booking please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    
}

module.exports=BookingRepository;