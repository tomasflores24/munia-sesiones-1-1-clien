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
import { useSelector } from "react-redux";

const Statistics = () => {
  const [isLoading, setIsloading] = useState(false);
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [categoryAges, setCategoryAges] = useState("");
  const [serviceAges, setServiceAges] = useState("");
  const [categoryGenders, setCategoryGenders] = useState();
  const [serviceGenders, setServiceGenders] = useState("");

  useEffect(() => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
    }, 4000);
  }, []);

  const user = useSelector((state) => state.auth.auth.user.userTypeId);

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

              <div>
                <section className="section-graphics">
                  <ColumnGraphicServices company={company} />
                  <RadarGraphic
                    company={company}
                    category={category}
                    setCategory={setCategory}
                  />
                </section>
              </div>

              <div>
                <p className="title__p__top">
                  Panel de metricas de servicios y categorías elejidos basado en
                  datos demográficos
                </p>
                <section className="section-graphics">
                  <ColumnGraphicAge
                    company={company}
                    categoryAges={categoryAges}
                    serviceAges={serviceAges}
                    setCategoryAges={setCategoryAges}
                    setServiceAges={setServiceAges}
                  />
                  <TortaGraphicGender
                    company={company}
                    categoryGenders={categoryGenders}
                    serviceGenders={serviceGenders}
                    setServiceGenders={setServiceGenders}
                    setCategoryGenders={setCategoryGenders}
                  />
                </section>
              </div>
              {user === 4 ? (
                <div>
                  <p className="title__p__top">
                    Panel de estadísticas de cantidad de usuarios en la
                    plataforma en el tiempo
                  </p>
                  <section className="section-graphics">
                    <StackedAreaGraphic />
                    <TortaGraphicAll />
                  </section>
                </div>
              ) : null}
            </div>
          </div>
          <div className="container-cards-stadistics">
            <CardsStatistics
              company={company}
              setCompany={setCompany}
              category={category}
              categoryAges={categoryAges}
              serviceAges={serviceAges}
              categoryGenders={categoryGenders}
              serviceGenders={serviceGenders}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
