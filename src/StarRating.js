//Original source is:
//https://github.com/michael-burrows-github/blog/blob/master/2020/049%20-%20Create%20a%20custom%20React%20star%20rating%20component/src/StarRating.js
//I have changed it to fit my needs

import React, { useState } from "react";
import './StarRating.css';

const StarRating = (props) => {
  const viewOnly = props.viewOnly;
  const presetRating = props.presetRating;

  const [rating, setRating] = useState(viewOnly ? presetRating : 0);
  const [hover, setHover] = useState(0);
  
  if (viewOnly) {
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on viewButton" : "off viewButton"}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      );
  } else {
    return (
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on clickButton" : "off clickButton"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      );
  }
  
  
};

export default StarRating;