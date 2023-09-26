// create a custom error object
const createError = (status , message) => {
    // define an object from the Error class , modify status , message properties as they camed from the parameter
    // then we return the err object
    // createError() returns an error object , so we can send inside next()
    let err = new Error()
    err.status = status
    err.message = message

    return err
}


module.exports = createError