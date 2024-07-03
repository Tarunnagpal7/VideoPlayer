class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something Went Wrong ! ",
        errors =[],
        stack ="" //stack of error
    ){
        super(message) //overmessage 
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errors = errors
        this.success = false

        //method to capture error which they occur at different places.
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}