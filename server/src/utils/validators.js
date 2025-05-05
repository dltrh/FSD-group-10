// Check whether the email is valid or invalid
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Validation for register section
exports.validateRegister = (data) => {
    const { email, password } = data;
    //check whether username and password fields have input.
    if (!email || !password)
        return 'Username and password are required.';

    //check whether email is right formatting
    if (!isValidEmail(email))
        return 'Wrong email formatting.';

    //check whether password suit with the minimum length
    if (password.length < 6)
        return 'Password must be at least 6 characters.';

    return null;
};

//Validation for login section
exports.validateLogin = (data) => {
    const { email, password } = data;
    //check if input is matched with registered information
    if (!email || !password)
        return 'Username and password are required.';

    //check whether email is right formatting
    if (!isValidEmail(email))
        return 'Wrong email formatting.';

    return null;
};
