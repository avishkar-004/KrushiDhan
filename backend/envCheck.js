const requiredEnvVars = ['MONGO_URL'];
const checkEnv = () => {
    const missing = requiredEnvVars.filter(v => !process.env[v]);
    if (missing.length > 0) {
        console.warn('Warning: Missing env vars:', missing.join(', '));
    }
};
module.exports = checkEnv;
