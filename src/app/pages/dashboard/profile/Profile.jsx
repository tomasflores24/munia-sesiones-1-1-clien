import UserProfile from "./UserProfile";
import ProviderProfile from "./profileTypes/ProviderProfile";

const Profile = () => {
  const profileData = {
    profileImage: "",
    username: "Usuario Ejemplo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ligula sed quam volutpat volutpat. Nulla facilisi.",
    inputsData: [
      {
        id: "nombre",
        label: "Nombre",
        type: "text",
        value: "Juan",
        placeholder: "Ingresa tu nombre",
      },
      {
        id: "apellido",
        label: "Apellido",
        type: "text",
        value: "Pérez",
        placeholder: "Ingresa tu apellido",
      },
      {
        id: "genero",
        label: "Género",
        type: "select",
        value: "hombre",
        placeholder: "",
      },
      {
        id: "telefono",
        label: "Teléfono",
        type: "text",
        value: "123456789",
        placeholder: "Ingresa tu número de teléfono",
      },
      {
        id: "correo",
        label: "Correo",
        type: "email",
        value: "juan@example.com",
        placeholder: "Ingresa tu correo electrónico",
      },
      {
        id: "pais",
        label: "País",
        type: "select",
        value: "pais1",
        placeholder: "",
      },
      {
        id: "ciudad",
        label: "Ciudad",
        type: "select",
        value: "ciudad1",
        placeholder: "",
      },
      {
        id: "fechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "date",
        value: "1990-01-01",
        placeholder: "",
      },
    ],
  };

  return (
    <>
      {/* <UserProfile {...profileData} /> */}
      <ProviderProfile />
    </>
  );
};

export default Profile;
