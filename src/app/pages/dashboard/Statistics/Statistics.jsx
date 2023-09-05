import "./Statistics.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import CardsStatistics from "./CardsStatistics";
import RadarGraphic from "./Graphics/RadarGraphic";
import StackedAreaGraphic from "./Graphics/StackedAreaGraphic";
import ColumnGraphicServices from "./Graphics/ColumnGraphicServices";
import ColumnGraphicAge from "./Graphics/ColumnGraphicAge";
import TortaGraphicGender from "./Graphics/TortaGraphicGender";
import TortaGraphicAll from "./Graphics/TortaGraphicAll";

const Statistics = () => {
  return (
    <LayoutDashboard>
      <div className="statistics-container">
        <div className="statistics-graphics-container">
          <section className="section-graphics">
            <ColumnGraphicServices />
          </section>
          <section className="section-graphics">
            <RadarGraphic />
          </section>
          <section className="section-graphics">
            <ColumnGraphicAge />
          </section>
          <section className="section-graphics">
            <TortaGraphicGender />
          </section>
          <section className="section-graphics">
            <StackedAreaGraphic />
          </section>
          <section className="section-graphics">
            <TortaGraphicAll />
          </section>
          </div >
          <div className="container-cards-stadistics">
            <CardsStatistics />
          </div>
        </div>
    </LayoutDashboard>
  );
};

export default Statistics;
