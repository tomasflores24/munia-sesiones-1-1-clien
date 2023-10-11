import "./CardsStatistics.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import { StatisticsServices } from "../../../services/dashboard/statistics/statistics.services";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const CardsStatistics = ({
  company,
  setCompany,
  category,
  categoryAges,
  serviceAges,
  categoryGenders,
  serviceGenders,
}) => {
  const user = useSelector((state) => state.auth.auth.user.userTypeId);

  const { data: collaborators, isLoading } = useQuery(
    ["getAllCollaborators"],
    StatisticsServices.getAllCollaborators
  );

  const { data: companies, refetch: companiesRefetch } = useQuery(
    ["getAllcompanies"],
    StatisticsServices.getAllCompanies
  );
  const { data: provider } = useQuery(
    ["getAllProvider"],
    StatisticsServices.getAllProvider
  );

  const { data: general, refetch: generalRefetch } = useQuery(
    ["getAllGeneral"],
    () => StatisticsServices.getAllGeneral(company)
  );

  const { data: getAllCategories, refetch: allCategoriesRefetch } = useQuery(
    ["getAllCategories"],
    () => StatisticsServices.getAllCategories(company)
  );

  const { data: getAllServices, refetch: allServicesRefetch } = useQuery(
    ["getAllServices"],
    () => StatisticsServices.getAllServices(company, category)
  );

  const { data: getAllGenders, refetch: allGendersRefetch } = useQuery(
    ["getAllGenders"],
    () =>
      StatisticsServices.getAllServices(
        company,
        categoryGenders,
        serviceGenders
      )
  );
  const { data: getAllAges, refetch: allAgesRefetch } = useQuery(
    ["getAllAges"],
    () => StatisticsServices.getAllAges(serviceAges, company, categoryAges)
  );

  const handleChange = async (event) => {
    await setCompany(event.target.value);
    await allGendersRefetch();
    await companiesRefetch();
    await generalRefetch();
    await allCategoriesRefetch();
    await allServicesRefetch();
    await allAgesRefetch();
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="cards-container">
          {user === 4 ? (
            <div className="card-top">
              <FormControl variant="standard" className="select__top">
                <InputLabel
                  id="demo-simple-select-standard-label"
                  className="select__p__top"
                >
                  Seleccionar Asociación
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={company}
                  onChange={handleChange}
                  label="Company"
                >
                  <MenuItem value="">Global</MenuItem>
                  {companies?.data.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      <em>{company.user.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ) : null}
          {user === 1 || user === 2 || user === 3 || user === 4 ? (
            <>
              <p className="divisor-header-bottom">Información general</p>
              <div className="card-header">
                <div className="card__value">{general?.data.totalUsers}</div>
                <div className="card__title">Usuarios</div>
              </div>
              <div className="card-header">
                <div className="card__value">
                  {general?.data.totalAppointments}
                </div>
                <div className="card__title">Citas programadas</div>
              </div>
              <div className="card-header">
                <div className="card__value__services">
                  {general?.data.mostUsedService}
                </div>
                <div className="card__title__services">
                  Servicio mas utilizado
                </div>
              </div>
              <div className="card-header">
                <div className="card__value">{general?.data.averageRating}</div>
                <div className="card__title">
                  Promedio de satisfacción general
                </div>
              </div>
            </>
          ) : null}

          {user === 4 ? (
            <>
              <p className="divisor-header-bottom">Información general</p>
              <div className="card-bottom">
                <div className="card__value">{collaborators?.data.length}</div>
                <div className="card__title">Usuarios</div>
              </div>
              <div className="card-bottom">
                <div className="card__value">{companies?.data?.length}</div>
                <div className="card__title">Clientes</div>
              </div>
              <div className="card-bottom">
                <div className="card__value">{provider?.data.length}</div>
                <div className="card__title">Proveedores</div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CardsStatistics;
