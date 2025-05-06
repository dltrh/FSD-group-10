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

//Validation for reset password
exports.validateResetPassword = ({ userId, newPassword, confirmPassword }) => {
    //check whether all the fields have data 
    if (!userId || !newPassword || !confirmPassword)
        return 'All fields are required';

    //check whether the new password and confirm password is matched
    if (newPassword !== confirmPassword)
        return 'Passwords do not match';

    //check whether the new password is suit with the minimum length
    if (newPassword.length < 6)
        return 'New password must be at least 6 characters';
    return null;
};