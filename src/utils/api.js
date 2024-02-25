import axios from 'axios';

const token = import.meta.env.VITE_APP_TMDB_TOKEN;
const baseURL = 'https://api.themoviedb.org/3';

const headers = {
    Authorization: `Bearer ${token}`
}
const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(baseURL + url, {
            headers,
            params,
        })
        return data
    } catch (error) {
        console.log('error', error)
    }
}

export default fetchDataFromApi;

