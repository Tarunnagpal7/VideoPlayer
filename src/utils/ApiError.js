class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something Went Wrong ! ",
        errors =[],
        statck ="" //stack of error
    ){
        super(message) //overmessage 
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errors = errors
        this.success = false

        //method to capture error which they occur at different places.
        if(statck){
            this.statck = statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}