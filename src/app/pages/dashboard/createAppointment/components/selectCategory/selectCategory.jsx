import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

import { CategoriesServices } from "../../../../../services/dashboard/categories/categories.service";

const SelectCategory = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const { data: categories, isLoading } = useQuery(["getAllCategory"], () =>
    CategoriesServices.getAllCategories()
  );

  const handleChangeCategory = async (event) => {
    const { value } = event.target;
    await setSelectedCategoryId(value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategoryId}
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

SelectCategory.propTypes = {
  selectedCategoryId: PropTypes.number.isRequired,
  setSelectedCategoryId: PropTypes.func,
};

export default SelectCategory;
