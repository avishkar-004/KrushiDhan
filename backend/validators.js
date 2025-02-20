const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateSignup = (body) => {
    const { first_name, last_name, contact_no, email, password, confirmPassword, street, state, city } = body;
    const errors = [];
    if (!first_name) errors.push('First name is required');
    if (!last_name) errors.push('Last name is required');
    if (!email || !validateEmail(email)) errors.push('Valid email is required');
    if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
    if (password !== confirmPassword) errors.push('Passwords do not match');
    if (!street || !state || !city) errors.push('Complete address is required');
    return errors;
};

module.exports = { validateEmail, validateSignup };
