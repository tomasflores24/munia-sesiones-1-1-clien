import "./Comments.scss";
import React, { useEffect, useState } from "react";
import Comment from "../../../components/Comment/Comment";
import CommentsServices from "../../../services/comments/comments.services";
import { useMutation, useQuery } from "react-query";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import arrowFilterIcon from "/assets/arrowFilterIcon.png";
import { format } from "date-fns";

const Comments = () => {
  const [comments, setComments] = useState([]);

  const [filters, setFilters] = useState({});

  const { isLoading, data, isSucess, refetch } = useQuery(
    ["getAllRatings"],
    () => CommentsServices.getAllRatings(filters.search)
  );

  useEffect(() => {
    if (data) {
      setComments(data.data);
    }
  }, [data]);

  const handleChangeFilters = (e) => {
    const { value, name } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  console.log(filters);

  return (
    <div className="rootContainer">
      <div className="commentsSection">
        <div className="commentsTitle">
          <h1>Comentarios de pacientes</h1>
          <input
            type="text"
            name="search"
            placeholder="search"
            value={filters.search}
            onChange={handleChangeFilters}
            id=""
          />
          <button
            onClick={() => {
              refetch();
            }}
          >
            buscar
          </button>
        </div>
        <div className="commentsFilters">
          <div className="filterText">
            <p>Satisfacción</p>
          </div>
          <div className="filterButtonContainer">
            <button className="filterButton">
              <img src={arrowFilterIcon} alt="arrowFilterIcon" />
            </button>
          </div>
          <div className="filterSeparatorLine"></div>
          <div className="filterText">
            <p>Fecha</p>
          </div>
          <div className="filterButtonContainer">
            <button className="filterButton">
              <img src={arrowFilterIcon} alt="arrowFilterIcon" />
            </button>
          </div>
          <div className="filterSeparatorLine"></div>
          <div className="filterText">
            <p>Servicio</p>
          </div>
          <div className="filterButtonContainer">
            <button className="filterButton">
              <img src={arrowFilterIcon} alt="arrowFilterIcon" />
            </button>
          </div>
        </div>

        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : data.data.length === 0 ? (
            <h1>no se encontro la informacion</h1>
          ) : (
            comments.map((el, index) => (
              <Comment
                username={el.user.name}
                rating={el.rating}
                service={el.service.name}
                commentDate={format(new Date(el.createdAt), "dd/MM/yyyy HH:mm")}
                commentText={el.comentary}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
