exports.JsonResponse = function (statusCode, body) {
    return{
        statusCode,
        body,
    };
};