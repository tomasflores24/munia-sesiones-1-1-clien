import {
  informations,
  titles,
  top,
} from "../../../Models/tablesDashboard/tableDiaryModel";
import Table from "../../../components/Table/Table";
import LayoutDashboard from "../Layout/LayoutDashboard";

const Clientes = () => {
  return <Table informations={informations} titles={titles} top={top} />;
};

export default Clientes;
