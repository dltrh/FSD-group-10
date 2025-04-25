//Validation for register section
exports.validateRegister = ({ username, password }) => {
    //check whether username and password input is meeting the requirement.
    if (!username || !password)
        return 'Username and password are required.';
    if (password.length < 6)
        return 'Password must be at least 6 characters.';
    return null;
};

//Validation for login section
exports.validateLogin = ({ username, password }) => {
    //check if input is matched with registered information
    if (!username || !password) return 'Username and password are required.';
    return null;
};
