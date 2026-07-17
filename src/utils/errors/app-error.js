const {StatusCodes}=require('http-status-codes');

class AppError extends Error{
    constructor(
        name,
        message='something went wrong',
        explanation='Service layer Error',
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        this.name=name;
        this.message=message;
        this.explanation=explanation;
        this.statusCode=statusCode;
    }
}

module.exports=AppError;
