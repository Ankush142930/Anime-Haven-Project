import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import { useEffect, useState } from 'react';

const Gallery = () => {
  const { id } = useParams();

  const { getCharacterPictures, pictures } = useGlobalContext();

  const [bigImageIndex, setBigImageIndex] = useState(0);

  const handleImage = (index) => {
    setBigImageIndex(index);
  };

  useEffect(() => {
    getCharacterPictures(id);
  }, [id]);

  return (
    <GalleryStyled>
      <div className="back">
        <Link to={`/`}>Back</Link>
      </div>
      <div className="big-image">
        <img src={pictures[bigImageIndex]?.jpg.image_url} alt="" />
      </div>
      <div className="small-images">
        {pictures?.map((item, index) => {
          return (
            <div
              className="image-container"
              key={index}
              onClick={() => handleImage(index)}
            >
              <img
                src={item.jpg.image_url}
                alt=""
                style={{
                  border:
                    index === bigImageIndex
                      ? '3px solid #eb5757'
                      : '3px solid #e5e7eb',
                  filter:
                    index === bigImageIndex ? 'grayscale(0)' : 'grayscale(60%)',
                  transform:
                    index === bigImageIndex ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.4s ease-in-out',
                }}
              />
            </div>
          );
        })}
      </div>
    </GalleryStyled>
  );
};

const GalleryStyled = styled.div`
  background-color: #ededed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;

    a {
      font-weight: 600;
      text-decoration: none;
      color: #eb5757;
    }
  }

  .big-image {
    display: inline-block;
    padding: 2rem;
    margin: 2rem 0;
    background-color: #fff;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
    position: relative;

    img {
      width: 350px;
    }
  }

  .small-images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;
    padding: 2rem;
    border-radius: 7px;
    background-color: #fff;
    border: 5px solid #e5e7eb;

    img {
      width: 6rem;
    }
  }
`;

export default Gallery;
