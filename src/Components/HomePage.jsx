/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Popular from './Popular';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Upcoming from './Upcoming';
import Airing from './Airing';

const HomePage = () => {
  const {
    handleChange,
    handleSubmit,
    search,
    searchAnime,
    searchResult,
    isSearch,
    getAiringAnime,
    getUpcomingAnime,
    getPopularAnime,
  } = useGlobalContext();
  const [rendered, setRendered] = useState('popular');

  const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <Popular rendered={rendered} />;
      case 'upcoming':
        return <Upcoming rendered={rendered} />;
      case 'airing':
        return <Airing rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <HomePageStyled>
      <header>
        <div className="logo">
          <h1>
            {rendered == 'popular'
              ? 'Popular Anime'
              : rendered == 'airing'
              ? 'Top-Airing Anime'
              : 'Upcoming Anime'}
          </h1>
        </div>

        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button onClick={() => setRendered('popular')}>Popular</button>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">search</button>
            </div>
          </form>

          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered('airing');
                getAiringAnime();
              }}
            >
              Airing
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered('upcoming');
                getUpcomingAnime();
              }}
            >
              Upcoming
            </button>
          </div>
        </div>
      </header>

      {switchComponent()}
    </HomePageStyled>
  );
};

const HomePageStyled = styled.div`
  background-color: #ededed;

  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }

      form {
        position: relative;
        width: 100%;

        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }

        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }

        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default HomePage;
