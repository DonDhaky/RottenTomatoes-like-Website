require('dotenv').config();
import fetch from 'node-fetch';

const fetchFilms = async () => {
    try {
        const response = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error Fetching films', error);
    }
};
export default fetchFilms;
