import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import "./selectService.style.scss";
import { ServiceServices } from "../../../../../services/dashboard/service/service.service";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

const SelectService = ({
  categoryId,
  selectedServiceId,
  setSelectedServiceId,
}) => {
  const {
    data: services,
    errors,
    refetch: refetchServices,
    isLoading,
  } = useQuery(["getServices", categoryId], () =>
    ServiceServices.getServicesByCategoryId(categoryId)
  );

  const handleChangeService = async (event) => {
    const { value } = event.target;
    await setSelectedServiceId(value);
  };

  return (
    <div className="select-service-container">
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <FormControl>
          <InputLabel
            className="select-service-title"
            id="demo-simple-select-label"
          >
            Selecciona un servicio
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedServiceId}
            onChange={handleChangeService}
            className="select-service "
          >
            <MenuItem value="" disabled>
              Seleccionar Servicio
            </MenuItem>
            {services?.data.map((el) => {
              return (
                <MenuItem key={el.id} value={el.id}>
                  <em>{el.name}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

SelectService.propTypes = {
  categoryId: PropTypes.number.isRequired,
  selectedServiceId: PropTypes.string.isRequired,
  setSelectedServiceId: PropTypes.func.isRequired,
};

export default SelectService;
