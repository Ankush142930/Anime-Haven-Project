/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../context/global';
import styled from 'styled-components';

const AnimeItem = () => {
  const { id } = useParams();

  //state
  const [anime, setAnime] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //fetch anime based on id
  const getAnime = async (id) => {
    const response = await fetch(`${baseURL}/anime/${id}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //fetch characters of the fetched anime
  const getCharacters = async (id) => {
    const response = await fetch(`${baseURL}/anime/${id}/characters`);
    const data = await response.json();
    setCharacters(data.data);
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  //destructure anime object
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    rating,
    status,
    source,
  } = anime;

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            <p>
              <span>Aired:</span>
              <span>{aired?.string}</span>
            </p>
            <p>
              <span>Rating:</span>
              <span>{rating}</span>
            </p>
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Status:</span>
              <span>{status}</span>
            </p>
            <p>
              <span>Source:</span>
              <span>{source}</span>
            </p>
            <p>
              <span>Season:</span>
              <span>{season}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
          </div>
        </div>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        </p>
      </div>

      <h3 className="title">Trailer</h3>
      <div className="trailer-container">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title={title}
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h1>No Trailer Available</h1>
        )}
      </div>
    </AnimeItemStyled>
  );
};

const AnimeItemStyled = styled.div`
  padding: 3rem 18rem;
  background-color: #ededed;

  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }

  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;

    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      img {
        border-radius: 7px;
      }

      .anime-details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          display: flex;
          gap: 1rem;
        }

        p span:first-child {
          font-weight: 600;
          color: #454e56;
        }
      }
    }
  }

  .trailer-container {
    display: flex;
    justify-content: center;
    align-items: center;

    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #fff;
    }
  }
`;

export default AnimeItem;
