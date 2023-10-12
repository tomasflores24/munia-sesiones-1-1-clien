import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./AppointmentCalendarStyle.scss";
import { AvailableService } from "../../services/dashboard/available/available.service";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import { daysOfWeek, groupDataByDay } from "../../utils/calendar";

const AppointmentCalendar = ({ providerId, selectedHour, setSelectedHour }) => {
  const [groupedHours, setGroupedHours] = useState([]);

  const { data, status } = useQuery(["providerAvailable", providerId], () =>
    AvailableService.getAllByProviderId(providerId)
  );

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const groupedHours = groupDataByDay(data.data);
      setGroupedHours(groupedHours);
    } else {
      setGroupedHours([]);
    }
  }, [data]);

  return (
    <div className="appointmentCalendar__root">
      <div className="appointmentCalendar__container">
        <ChevronLeftIcon className="left-arrow arrow-icons" fontSize="large" />
        <ChevronRightIcon
          className="right-arrow arrow-icons"
          fontSize="large"
        />
        {status === "loading" ? (
          <div className="loading-container">
            <LoadingSpinner />
          </div>
        ) : status === "success" && groupedHours.length > 0 ? (
          groupedHours.map((day, indexDay) => (
            <div key={indexDay} className="date">
              <div className="date-header">
                <div className="title">{daysOfWeek[indexDay]}</div>
                <p className="desc">
                  {day
                    ? format(
                        new Date(day.at(0).startTime?.slice(0, -1) ?? 0),
                        "d MMM"
                      )
                    : null}
                </p>
              </div>
              <div className="hours-container">
                {day &&
                  day
                    .sort(
                      (a, b) => new Date(a.startTime) - new Date(b.startTime)
                    )
                    .map((hour) => (
                      <button
                        key={hour.id}
                        type="button"
                        className={`hour-btn ${
                          selectedHour.id === hour.id ? "selected" : ""
                        }`}
                        disabled={hour.StatusId !== 1}
                        onClick={() => {
                          setSelectedHour(hour);
                        }}
                      >
                        {hour.startTime.split("T")[1].slice(0, 5)}
                      </button>
                    ))}
              </div>
            </div>
          ))
        ) : (
          <p className="no-hours">No hay horarios disponibles</p>
        )}
      </div>

      {status === "success" && groupedHours.length > 0 ? (
        <label htmlFor="more-hours" className="more-hours">
          <input type="checkbox" id="more-hours" />
          <p>Ver mas horarios</p>
          <ExpandMoreIcon className="expand-icon" fontSize="large" />
        </label>
      ) : null}
    </div>
  );
};

AppointmentCalendar.propTypes = {
  providerId: PropTypes.string.isRequired,
  selectedHour: PropTypes.object.isRequired,
  setSelectedHour: PropTypes.func.isRequired,
};

export default AppointmentCalendar;
