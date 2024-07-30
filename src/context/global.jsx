/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useState } from 'react';

const GlobalContext = createContext();

export const baseURL = 'https://api.jikan.moe/v4';

//Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'GET_POPULAR_ANIME':
      return { ...state, popularAnime: action.payload, loading: false };
    case 'GET_UPCOMING_ANIME':
      return { ...state, upcomingAnime: action.payload, loading: false };
    case 'GET_AIRING_ANIME':
      return { ...state, airingAnime: action.payload, loading: false };
    case 'SEARCH':
      return { ...state, searchResult: action.payload, loading: false };
    case 'GET_CHARACTER_PICTURES':
      return { ...state, pictures: action.payload, loading: false };
    default:
      return state;
  }
};

//Actions
const LOADING = 'LOADING';
const SEARCH = 'SEARCH';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME';
const GET_AIRING_ANIME = 'GET_AIRING_ANIME';
const GET_CHARACTER_PICTURES = 'GET_CHARACTER_PICTURES';

export const GlobalContextProvider = ({ children }) => {
  //Initial State of the application
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResult: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == '') {
      state.isSearch = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert('Please enter a valid search term');
    }
  };

  //Fetching popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  //Fetching Top-airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  //Fetching upcoming anime
  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  //search an anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseURL}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    console.log(data.data);
    dispatch({ type: SEARCH, payload: data.data });
  };

  //fetching anime characters
  const getCharacterPictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/characters/${id}/pictures`);
    const data = await response.json();
    dispatch({ type: GET_CHARACTER_PICTURES, payload: data.data });
  };

  //initial render
  React.useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getAiringAnime,
        getUpcomingAnime,
        getPopularAnime,
        getCharacterPictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
