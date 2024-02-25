import { useEffect, useState } from 'react';
import fetchDataFromApi from '../utils/api';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setData(null)
        setLoading('Loading...')
        setError(null)
        fetchDataFromApi(url)
            .then(response => {
                setData(response)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error)
            })

    }, [url])
    return { data, loading, error }
}

