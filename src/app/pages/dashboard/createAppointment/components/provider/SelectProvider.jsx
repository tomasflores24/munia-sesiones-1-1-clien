import PropTypes from "prop-types";
import { useEffect } from "react";
import { useQuery } from "react-query";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./SelectProviderStyle.scss";
import { useSlider } from "../../../../../hooks/useSlider";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";
import { ProvidersServices } from "../../../../../services/dashboard/providers/providers.services";

const SelectProvider = ({ setSelectedProviderId, serviceId }) => {
  const { data: providers, status } = useQuery(["providers", serviceId], () =>
    ProvidersServices.getAllProviders({ serviceId })
  );

  const { next, prev, sliderIndex } = useSlider(providers?.data || []);

  useEffect(() => {
    if (providers?.data?.length > 0) {
      setSelectedProviderId(providers.data[sliderIndex]?.id);
    } else {
      setSelectedProviderId(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderIndex]);

  return (
    <div className="selectProvider__root">
      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "success" ? (
        <>
          <div onClick={prev}>
            <ChevronLeftIcon
              className="left-arrow arrow-icons"
              fontSize="large"
            />
          </div>
          <div className="slider">
            {providers.data?.length === 0 ? (
              <p className="no-providers">No hay proveedores para este servicio</p>
            ) : (
              providers.data?.map((provider, index) => (
                <div
                  key={provider.id}
                  className={index === sliderIndex ? "slide active" : "slide"}
                >
                  <div className="profile-img">Img</div>
                  <div className="profile-info">
                    <p className="name">{provider.user.name}</p>
                    <p className="data-list">
                      Enfoque: <span>Integrativo</span>
                    </p>
                    <p className="data-list">
                      Nacionalidad: <span>Argentina</span>
                    </p>
                    <p className="data-list">
                      Cedula: <span>54678</span>
                    </p>
                  </div>
                  <div className="rating">
                    <img
                      src="/assets/ratingIcon.png"
                      alt="rating"
                      width={24}
                      height={24}
                    />
                    <p>3.9/5.0</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div onClick={next}>
            <ChevronRightIcon
              className="right-arrow arrow-icons"
              fontSize="large"
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

SelectProvider.propTypes = {
  setSelectedProviderId: PropTypes.func.isRequired,
  serviceId: PropTypes.number,
};

export default SelectProvider;
