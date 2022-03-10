import { useState, useEffect} from 'react';

//API
import API from '../API';

//Helpers
import { isPersistedState } from '../helpers';


const intialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};


export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(intialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,
                results: 
                page > 1 ? [...prev.results, ...movies.results] : [...movies.results]

            }))

        } catch (error){
            setError(true);
        };

        setLoading(false);

    };

    // Initial render and search

    useEffect (() => {
        if(!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if(sessionState) {
                console.log('grabbing from session storage');
                setState(sessionState);
                return;
            }
        }

        console.log('grabbibg from API');

        setState(intialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //Load more

    useEffect (() => {
        if(!isLoadingMore) return;

        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    //Write to session storage
    useEffect(() => {
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
    }, [searchTerm, state])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
};