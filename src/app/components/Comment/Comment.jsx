import "./Comment.scss";
import React from "react";
import ratingIcon from "/assets/ratingIcon.png";

const Comment = ({ username, service, commentDate, rating, commentText }) => {
  return (
    <div className="comment">
      <div className="commentInfo">
        <p className="commentInfoTitle">{username}</p>
        <p>{service}</p>
        <p>{commentDate}</p>
      </div>
      <div className="commentSection">
        <p className="commentText">{commentText}</p>
        <div className="commentRating">
          <img src={ratingIcon} />
          <p>{rating} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
