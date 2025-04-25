export const getWeatherApiKey = () => {
    return process.env.REACT_APP_WEATHER_API_KEY || '';
};
export const getNewsApiKey = () => {
    return process.env.REACT_APP_NEWS_API_KEY || '';
};
