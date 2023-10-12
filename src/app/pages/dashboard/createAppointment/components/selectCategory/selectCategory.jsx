import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import "./selectCategory.style.scss";
import { CategoriesServices } from "../../../../../services/dashboard/categories/categories.service";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

const SelectCategory = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const { data: categories, isLoading } = useQuery(["getAllCategory"], () =>
    CategoriesServices.getAllCategories()
  );

  const handleChangeCategory = async (event) => {
    const { value } = event.target;
    await setSelectedCategoryId(value);
  };

  return (
    <div className="select-container">
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : (
        <FormControl>
          <InputLabel
            className="select-category-title"
            id="demo-simple-select-label"
          >
            Selecciona una categoria
          </InputLabel>
          <Select
            className="select-category"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategoryId}
            onChange={handleChangeCategory}
          >
            <MenuItem value="" disabled>
              Selecciona Categoria
            </MenuItem>
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
      )}
    </div>
  );
};

SelectCategory.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
  setSelectedCategoryId: PropTypes.func,
};

export default SelectCategory;
