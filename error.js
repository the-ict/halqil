export const createError = (status, message) => {
    const error = {}
    error.status = status || 500
    error.message = message || "Server error!"
    return error
}