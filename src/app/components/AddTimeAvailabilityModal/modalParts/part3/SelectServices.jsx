import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "./SelectServicesStyle.scss";
import { useGetProviderServices } from "../../../../hooks/Register/useServices";
import LoadingSpinner from "../../../../shared/loadingSpinner/LoadingSpinner";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const SelectServices = ({ closeModal, providerId }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const { isLoading, isSuccess, data } = useGetProviderServices({
    providerId,
  });
  const services = useMemo(
    () => data?.data?.[0]?.provider_assign_service ?? [],
    [data]
  );

  const isAllSelected =
    services?.length > 0 && selectedServices.length === services?.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedServices(
        selectedServices.length === services?.length ? [] : services
      );
      return;
    }
    setSelectedServices(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(selectedServices);
  };

  return (
    <div className="selectServices__root">
      <div className="selectServices__header">
        <h2 className="title">Seleccionar servicios</h2>
        <CloseIcon className="closeIcon" onClick={closeModal} />
      </div>

      <form className="selectServices__body" onSubmit={onSubmit}>
        <div className="body-header">
          <span className="desc">
            Seleccione el mes, año y intervalo entre sesiones
          </span>
        </div>

        <div className="body__content">
          <div className="selectServices__multiselect">
            {isLoading ? (
              <LoadingSpinner />
            ) : isSuccess && !isLoading ? (
              <FormControl className="multiselect__container">
                <InputLabel id="multiple-select-label" className="label">
                  Servicios
                </InputLabel>
                <Select
                  labelId="multiple-select-label"
                  multiple
                  value={selectedServices}
                  onChange={handleChange}
                  renderValue={(selected) =>
                    selected?.map((option) => option.service.name).join(", ")
                  }
                  MenuProps={MenuProps}
                  className="select__input"
                  fullWidth
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={
                          selectedServices.length > 0 &&
                          selectedServices.length < services.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {services?.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      <ListItemIcon>
                        <Checkbox
                          checked={selectedServices.indexOf(option) > -1}
                        />
                      </ListItemIcon>
                      <ListItemText primary={option.service.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}
          </div>
        </div>

        <section className="selectServices__action-button">
          <button className="restore__btn" type="button">
            Restaurar
          </button>

          <button className={`continue__btn`} type="submit">
            Confirmar
          </button>
        </section>
      </form>
    </div>
  );
};

SelectServices.propTypes = {
  nextStep: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  providerId: PropTypes.string,
};

export default SelectServices;
