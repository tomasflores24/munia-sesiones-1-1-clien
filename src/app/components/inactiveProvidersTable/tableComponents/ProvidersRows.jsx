import PropTypes from "prop-types";
import { ProvidersServices } from "../../../services/dashboard/providers/providers.services";
import { useQuery } from "react-query";

const ProvidersRows = ({ data, openModal }) => {
  // services colors: text: #00000099,  parent: #D9D9D9
  const { isLoading, isSuccess, data: inactiveProviders } = useQuery(
    ['getInactiveProviders'],
    () => ProvidersServices.getInactiveProviders()
  )
  const {
    data: providerData,
    refetch: providerRefetch,
    isLoading: providerIsLoading,
  } = useQuery(
    ["getProviderById"],
    () => ProvidersServices.getProviderById(data),
  );
  const descargarDocumentos = (provider) => {
    const documentos = [
      {
        nombre: 'Tarjeta profesional',
        contenido: provider.dniDoc,
      },
      {
        nombre: 'Diploma de grado',
        contenido: provider.universityDegree,
      },
      {
        nombre: 'Certificación bancaria',
        contenido: provider.profesionalCard,
      },
      {
        nombre: 'Portfolio de servicios',
        contenido: provider.curriculum,
      },
    ];
    documentos.forEach((documento) => {
      console.log(documento);
      // Crea un objeto Blob con el contenido del documento
      /*  console.log(documento); */
      const blob = new Blob([documento.contenido], { type: 'application/pdf' });

      // Crea un enlace de descarga
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = documento.nombre;
      a.style.display = 'none';

      // Agrega el enlace al DOM y simula un clic
      document.body.appendChild(a);
      a.click();

      // Limpia y remueve el enlace
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    });
  };

  return (
    <>
      <div className="shared_table-body">
        {data?.map((appointment) => (
          <div className="row-table-container" key={appointment.id}>
            <div className="data-row-tag">
              <div className="imageName__wrapper">
                <img src={appointment.user.profilePic} alt="picture" />
                <p>{appointment.user.name}</p>
              </div>
            </div>
            <div className="data-row-tag">Servicios</div>
            <div className="data-row-tag">Sesiones agregadas</div>
            <div className="data-row-tag">Calificaciones</div>
            <div className="data-row-tag">{appointment.user.email}</div>
            <div className="data-row-tag data-row-actions">
              <button
                type="button"
                onClick={() => descargarDocumentos(appointment)}
                className="action-button"
              >
                Ver docuementación
              </button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ProvidersRows.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ProvidersRows;
