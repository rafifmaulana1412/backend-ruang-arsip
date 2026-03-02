module.exports = (schema) => (req, res, next) => {
    console.log(schema)
    const result = schema.validate(req.body, { abortEarly: false });

    if (result.error) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: result.error.details.map(err => err.message)
        });
    }


    next();
};

// module.exports = (schema, property = "body") => {
//     return (req, res, next) => {
//         const { error, value } = schema.validate(req[property], {
//             abortEarly: false,
//         });

//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Validation error",
//                 errors: error.details.map((err) => err.message),
//             });
//         }

//         req[property] = value;
//         next();
//     };
// };