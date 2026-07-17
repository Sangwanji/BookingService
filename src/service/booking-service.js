const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig");
const { BookingRepository } = require("../repository");
const axios=require('axios');
const { ServiceError } = require("../utils/errors");

class BookingService{
    constructor(){
        this.bookingRepository= new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId=data.flightId;
            const getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response=await axios.get(getFlightRequestUrl);
            const flightData=response.data.data;
            let priceOfTheFlight=flightData.price;
            if(data.noOfSeats> flightData.totalSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient Seats in the flight');
            }
            const totalCost=priceOfTheFlight*data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await Promise.all([
                axios.patch(updateFlightRequestUrl, {
                    totalSeats: flightData.totalSeats - data.noOfSeats
                }),
                    this.bookingRepository.update(booking.id, {
                        status: 'Booked'
                })
            ]);
            return await this.bookingRepository.get(booking.id);
        } catch (error) {
            console.log(error);
            if(error.name=='RepositoryError' || error.name=='ValidationError') throw error;
            throw new ServiceError();
        }
    }
}

module.exports=BookingService;