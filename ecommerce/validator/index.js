exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Error: Please enter a name').notEmpty()
    req.check('email', 'Error: Please enter an email between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Error: Missing @ character in the email field')
        .isLength({
            min: 4,
            max: 32
        });
        req.check('password', 'Error: Please enter a password').notEmpty()
        req.check('password')
            .isLength({min: 6})
            .withMessage('Error: Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage("Error: Password must contain a number");
                const errors = req.validationErrors()
                if(errors) {
                    const firstError = errors.map(error => error.msg)[0];
                    return res.status(400).json({ error: firstError });
                }
                next();
};