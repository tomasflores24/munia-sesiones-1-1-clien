import "./Comments.scss";
import React, { useEffect, useState } from "react";
import Comment from "../../../components/Comment/Comment";
import CommentsServices from "../../../services/comments/comments.services";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton } from "@mui/material";
import index from './../../auth/index';

const ratingsArray = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

const Comments = () => {
  const [filters, setFilters] = useState();
  const [rating, setRating] = useState(0)
  const [service, setService] = useState()
  const [date, setDate] = useState()

  const { isLoading: ratingsAreLoading, data: ratingsData, refetch: ratingsRefetch } = useQuery(
    ["getAllRatings"],
    () => CommentsServices.getAllRatings(filters, rating, service, date)
  );

  const { isLoading: serviceLoading, data: serviceData } = useQuery(
    ["getAllService"],
    () => CommentsServices.getAllService()
  );

  const handleChangeFilters = async (e) => {
    const { value } = e.target;
    await setFilters(value);
    ratingsRefetch();
  };

  const handleChangeRating = async (e) => {
    const { value } = e.target;
    await setRating(value);
    ratingsRefetch();
  }

  const handleChangeService = async (e) => {
    const { value } = e.target;
    await setService(value);
    ratingsRefetch();
  }

  const handleChangeDate = async (e) => {
    const { value } = e.target;
    await setDate(value);
    ratingsRefetch();
  };
  console.log(date);

  return (
    <div className="rootContainer">
      <div className="commentsSection">
        <div className="commentsTitle">
          <h1>Comentarios de pacientes</h1>

          <div className="commentsSearchBar">
            <input
              id=""
              className="inputSearchBar"
              type="text"
              name="fecha"
              placeholder="Busca comentarios aquí"
              value={filters}
              onChange={handleChangeFilters}
            />
            <button
              className="buttonSearchBar"
              onClick={async () => {
                  await setFilters("")
              }}
            >
              Buscar
            </button>
          </div>

        </div>

        {ratingsAreLoading || serviceLoading ? (
          <LoadingSpinner />
        ) : !ratingsAreLoading && !serviceLoading ? (
          <>
            <div className="commentsFilterContainer">
              <div className="satisfactionButton">
                <select
                  className="satisfactionComment"
                  value={rating}
                  onChange={handleChangeRating}
                >
                  <option hidden >Satisfacción</option>
                  {
                    ratingsArray.map((num, index) => (
                      <option
                        key={index}
                        value={num}
                      >{num}
                      </option>

                    ))
                  }

                </select>
              </div>
              <div className="dateButton">
                <h2 className="dateTitle">Fecha</h2>
                <input
                  id="date"
                  className="dateComment"
                  name="date"
                  placeholder="Fecha"
                  type="date"
                  value={date}
                  onChange={handleChangeDate}
                >
                </input>
              </div>
              <div className="serviceButton">
                <select
                  className="serviceComment"
                  value={service}
                  onChange={handleChangeService}
                >
                  <option hidden>Servicio</option>
                  {
                    serviceData?.data?.allServices?.map((ser, index) => (
                      <option
                        key={index}
                        value={ser.id}
                      >{ser.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <IconButton
                className="refreshFilters"
                aria-label="refresh"
                size="medium"
                onClick={async () => {
                  await setFilters()
                  await setService()
                  await setRating(0)
                  await setDate()
                  ratingsRefetch()
                }}

              >
                <ReplayIcon />
              </IconButton>
            </div>


            {ratingsAreLoading || serviceLoading ? (
              <LoadingSpinner />
            ) : (
              ratingsData?.data?.map((el) => (
                <Comment
                  key={el.id}
                  username={el.user.name}
                  rating={el.rating}
                  service={el.service.name}
                  commentDate={format(new Date(el.createdAt), "dd/MM/yyyy HH:mm")}
                  commentText={el.comentary}
                />
              ))
            )
            }
          </>
        ) : null
        }
      </div>
    </div>
  );
};

export default Comments;
