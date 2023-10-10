import { useQueryClient } from "react-query";
import { useState, useEffect } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./AppointmentCalendarStyle.scss";
import { useMutation, useQuery } from "react-query";
import { AvailableService } from "../../services/dashboard/available/available.service";
import LoadingSpinner from "../../shared/loadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import { AppointmentService } from "../../services/dashboard/appointments/appointment.service";
import { daysOfWeek, groupDataByDay } from "../../utils/calendar";
import toast from "react-hot-toast";

const AppointmentCalendar = () => {
  const [selectedHour, setSelectedHour] = useState({ id: undefined });
  const [groupedHours, setGroupedHours] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useQuery(["providerAvailable"], () =>
    AvailableService.getAllByProviderId("4a3b2c1d-a1b2-4c3d-8e9f-6b7c8d9e0f1a")
  );
  const { mutate } = useMutation(AppointmentService.createAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries("providerAvailable");
      toast.success("Reunión agendada con éxito");
      setSelectedHour({ id: undefined });
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Algo salio mal");
    },
  });

  const onSubmit = () => {
    mutate({
      ServiceId: 3,
      CollaboratorId: "f4c2d071-b2a9-4c71-b1ea-96bfc2d4b19e",
      ProviderId: selectedHour.ProviderId,
      AvailableId: selectedHour.id,
    });
  };

  useEffect(() => {
    if (data?.data) {
      const groupedHours = groupDataByDay(data.data);
      setGroupedHours(groupedHours);
    }
  }, [data]);

  return (
    <div className="appointmentCalendar__root">
      <div className="appointmentCalendar__container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          !isLoading &&
          isSuccess &&
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
        )}
      </div>

      {!isLoading && isSuccess ? (
        <label htmlFor="more-hours" className="more-hours">
          <input type="checkbox" id="more-hours" />
          <p>Ver mas horarios</p>
          <ExpandMoreIcon className="expand-icon" fontSize="large" />
        </label>
      ) : null}

      <button type="button" onClick={onSubmit}>
        Confirm
      </button>
    </div>
  );
};
export default AppointmentCalendar;
