//Validation for register section
exports.validateRegister = (data) => {
    const { email, password } = data;
    //check whether username and password input is meeting the requirement.
    if (!email || !password)
        return 'Username and password are required.';
    if (password.length < 6)
        return 'Password must be at least 6 characters.';
    return null;
};

//Validation for login section
exports.validateLogin = (data) => {
    const { email, password } = data;
    //check if input is matched with registered information
    if (!email || !password) return 'Username and password are required.';
    return null;
};
