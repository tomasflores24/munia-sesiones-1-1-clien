import React from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { AppointmentService } from "../../../../../services/dashboard/appointments/appointment.service";
import { useQuery } from "react-query";

const SelectCategory = ({ selectedCategory, setSelectedCategory }) => {
  const {
    data: categories,
    errors,
    refetch: refetchCategory,
    isLoading,
  } = useQuery(["getAllCategory"], () => AppointmentService.getAllCategory());

  const handleChangeCategory = async (event) => {
    const { value } = event.target;
    console.log(value);
    await setSelectedCategory(value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label=""
          onChange={handleChangeCategory}
        >
          {categories &&
            categories?.data !== undefined &&
            categories.data.length > 0 &&
            categories.data.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                <em>{category.name}</em>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCategory;
