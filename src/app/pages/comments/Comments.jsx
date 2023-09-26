import "./Comments.scss"
import React from "react";
import SideBar from "../../components/sideBar/SideBar"
import Comment from "../../components/Comment/Comment"
import CommentsServices from "../../services/comments/comments.services"
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import arrowFilterIcon from "/assets/arrowFilterIcon.png"


const Comments = () => {

  const { isLoading, data, isSucess } = useQuery(
    ["getAllRatings"],
    CommentsServices.getAllRatings,
    );

    const showRating = ()=>{
      const ratingsArray = data.data.allRatings;
      if (ratingsArray) {
        return ratingsArray.map(rating => {
          const ratingString = rating.ratingScore + ""
            if(ratingString) {
              return (
                ratingString
              )
            }
          
          }
        );
      }
    }
    
    return (
      <div className="rootContainer">
        <div className="commentsSection">
            <div className="commentsTitle">
              <h1>Comentarios de pacientes</h1>      
            </div>
            <div className="commentsFilters">
              <div className="filterText"><p>Satisfacción</p></div>
              <div className="filterButtonContainer"><button className="filterButton">
                <img src={arrowFilterIcon} alt="arrowFilterIcon" /></button></div>
              <div className="filterSeparatorLine"></div>
              <div className="filterText"><p>Fecha</p></div>
              <div className="filterButtonContainer"><button className="filterButton">
                <img src={arrowFilterIcon} alt="arrowFilterIcon" /></button></div>
              <div className="filterSeparatorLine"></div>
              <div className="filterText"><p>Servicio</p></div>
              <div className="filterButtonContainer"><button className="filterButton">
                <img src={arrowFilterIcon} alt="arrowFilterIcon" />
                </button></div>
            </div>
            

            <div>
              {isLoading ? (<LoadingSpinner/>) : (
                <Comment
                username="nombre"
                rating={showRating()}
                service="service"
                commentDate="commentDate"
                commentText="commentText"
                />
                )
            }
              </div>
        </div>
      </div>
    )
}

export default Comments;