import React, { useEffect } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useQuery } from "react-query";
import { AppointmentService } from "../../../../../services/dashboard/appointments/appointment.service";

const SelectService = ({
  selectedCategory,
  selectedService,
  setSelectedService,
}) => {
  const {
    data: services,
    errors,
    refetch: refetchServices,
    isLoading,
  } = useQuery(["getServices"], () =>
    AppointmentService.getServices(selectedCategory)
  );

  const handleChangeService = async (event) => {
    const { value } = event.target;
    await setSelectedService(value);
  };

  useEffect(() => {
    refetchServices();
  }, [refetchServices, selectedCategory]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedService}
          label=""
          onChange={handleChangeService}
        >
          {services?.data.map((el) => {
            return (
              <MenuItem key={el.id} value={el.id}>
                <em>{el.name}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectService;
