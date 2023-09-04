import "./Statistics.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import CardsStatistics from "./CardsStatistics";
import RadarGraphic from "./Graphics/RadarGraphic";
import LinealGraphic from "./Graphics/LinealGraphic";
import TortaGraphic from "./Graphics/TortaGraphic";
import ColumnGraphic from "./Graphics/ColumnGraphic";
import StackedAreaGraphic from "./Graphics/StackedAreaGraphic";

const Statistics = () => {
  return (
    <LayoutDashboard>
      <div className="statistics-container">
        <div className="statistics-graphics-container">
          <section className="section-graphics">
            <LinealGraphic />
          </section>

          <section className="section-graphics">
            <TortaGraphic />
          </section>
          <section className="section-graphics">
            <StackedAreaGraphic />
            
          </section>
          <section className="section-graphics">
            <ColumnGraphic />
          </section>
          <section className="section-graphics">
            <RadarGraphic />
          </section>
        </div>
        <CardsStatistics />
      </div>
    </LayoutDashboard>
  );
};

export default Statistics;
