import "./Statistics.scss";
import LayoutDashboard from "../Layout/LayoutDashboard";
import CardsStatistics from "./CardsStatistics";
import RadarGraphic from "./Graphics/RadarGraphic";
import StackedAreaGraphic from "./Graphics/StackedAreaGraphic";
import ColumnGraphicServices from "./Graphics/ColumnGraphicServices";
import ColumnGraphicAge from "./Graphics/ColumnGraphicAge";
import TortaGraphicGender from "./Graphics/TortaGraphicGender";
import TortaGraphicAll from "./Graphics/TortaGraphicAll";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";

const Statistics = () => {
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 4000);
  }, []);

  return (
    <div className="statistics-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="statistics-graphics-container">
            <div className="section-mid">
              <p className="title__p__top">
                Panel de métricas de servicios elejidos por los usuarios
              </p>
              <section className="section-graphics">
                <ColumnGraphicServices />
                <RadarGraphic />
              </section>
              <p className="title__p__top">
                Panel de metricas de servicios y categorías elejidos basado en
                datos demográficos
              </p>
              <section className="section-graphics">
                <ColumnGraphicAge />
                <TortaGraphicGender />
              </section>
              <p className="title__p__top">
                Panel de estadísticas de cantidad de usuarios en la plataforma
                en el tiempo
              </p>
              <section className="section-graphics">
                <StackedAreaGraphic />
                <TortaGraphicAll />
              </section>
            </div>
          </div>
          <div className="container-cards-stadistics">
            <CardsStatistics />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
