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
            throw new AppError('RepositoryError','Can not create a booking','There was some issue in creating a booking please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async update(bookingId,data){
        try {
            const booking=await Booking.findByPk(bookingId);
            if(data.status){
                booking.status=data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError('RepositoryError','Can not update a booking','There was some issue in updating a booking please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async get(bookingId){
        try {
            return await Booking.findByPk(bookingId);
        } catch (error) {
            throw new AppError('RepositoryError','Can not fetch a booking','There was some issue in fetching a booking please try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports=BookingRepository;