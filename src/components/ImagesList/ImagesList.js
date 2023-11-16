import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchImages, emptyImages } from "../../Reducers/imageSlice.js";
import { popUpHandler } from "../../Reducers/popUpSlice";
import "./imagesStyle.css";
// import data from './data.json'

const ImagesList = () => {
  // let images = data.photos;
  const [status, setStatus] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { images, loading, error, hasMore } = useSelector((state) => state.images);
  const { isOpen, query } = useSelector((state) => state.popup);
  const observer = useRef();

  // using Callback ref to get current scroll element and updating pagenumber on touching target element
  const lastImageRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      // hasMore checks if there is no any data left
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevNumber => prevNumber + 1)
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, hasMore])


  const dispatch = useDispatch();

  //api call when pageNumber changes or query
  useEffect(() => {


    if (query !== "") {
      dispatch(fetchImages({ onSuccess, onFailure, pageNumber, query }));
    }

    // on clearing input emptying images array
    else {
      dispatch(emptyImages())
    }
  }, [pageNumber, query]);


  const onSuccess = () => {
    setStatus(true);
  };

  const onFailure = () => {
    setStatus(false);
  };


  return (
    <div className={!isOpen ? "imgsContainer" : "compressedContainer"}>
      {status &&
        <div className="imgsWrapper">
          {images.map((img, index) => {
            return <div key={img?.id} className="imgCard">
              {images.length === index + 1 ?
                // getting last element
                <img
                  src={img?.src?.large}
                  className="img"
                  ref={lastImageRef}
                  onClick={() => dispatch(popUpHandler({ img, index }))}
                  alt={img?.alt}
                />

                : <img
                  src={img?.src?.large}
                  key={img.id}
                  className="img"
                  onClick={() => dispatch(popUpHandler({ img, index }))}
                />
              }
              <div className="des">
                <a href={img.photographer_url} target="_blank">{img.photographer_url}</a>
                <div> {img.photographer}</div>
              </div>
            </div>

          })}
        </div>
      }
      {loading && "Loading..."}
      {error && "Sorry,something went wrong"}
    </div>
  );
};

export default ImagesList;
