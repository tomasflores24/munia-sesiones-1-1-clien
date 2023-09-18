import SelectProfile from "../../../components/SelectProfile/SelectProfile";
import "./UserData.scss";
import InputText from "../../../components/InputText/InputText";
import EditIcon from "@mui/icons-material/Edit";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RectangleCommon from "../../../components/Rectangle/RectangleCommon";
import CloseIcon from "@mui/icons-material/Close";
import LockResetIcon from "@mui/icons-material/LockReset";
const UserData = () => {
  const userInterests = ["Mindfulness", "Nutricion y/o..."];

  return (
    <section className="profile">
      <div className="profile__description">
        <img
          src="https://i0.wp.com/sonria.com/wp-content/uploads/2016/08/2165947w620.jpg?fit=620%2C348&ssl=1"
          alt=""
          className="profile__img"
        />
        <div className="profile__texts">
          <h2 className="profile__titleDescription">
            Descripción <EditIcon className="title__icon" />
          </h2>
          <p className="profile__pDescription">
            ¡Hola! Soy Marcos, un Ingeniero entusiasta. Me apasiona el fútbol,
            el ciclismo y siempre busco formas de crecimiento personal. Estoy
            aquí para explorar la terapia como herramienta de bienestar
            emocional y enfrentar desafíos. ¡Espero embarcarme en este viaje
            hacia una mente más fuerte!
          </p>
        </div>
      </div>

      <section className="section__data">
        <div className="profile__data">
          <div className="profile__nombre">
            <InputText label="Nombre" value="Marcos Esteban" />
          </div>
          <div className="profile__apellido">
            <InputText label="Apellido" value="Bozza" />
          </div>
          <div className="profile__genero">
            <SelectProfile
              options={["Opcion 1", "Opcion 2", "Opcion 4", "Opcion 5"]}
              optionDefault={"Género"}
            />
          </div>
          <div className="profile__pais">
            <SelectProfile
              options={["Opcion 1", "Opcion 2", "Opcion 4", "Opcion 5"]}
              optionDefault={"Pais"}
            />
          </div>
          <div className="profile__telefono">
            <InputText label="Teléfono" value="54 11 34240778" />
          </div>
          <div className="profile__ciudad">
            <SelectProfile
              options={["Opcion 1", "Opcion 2", "Opcion 4", "Opcion 5"]}
              optionDefault={"Ciudad"}
            />
          </div>
          <div className="profile__correo">
            <InputText label="Correo" value="Maria@munia.com" type={"email"} />
          </div>
          <div className="profile__nacimiento">
            <SelectProfile
              options={["Opcion 1", "Opcion 2", "Opcion 4", "Opcion 5"]}
              optionDefault={"Fecha de nacimiento"}
            />
          </div>
          <div className="profile__intereses">
            <RectangleCommon
              text="Agregar intereses"
              Icon={HomeRepairServiceIcon}
            />
            <div className="profile__deleteIntereses">
              <h5 className="intereses__tittle">Intereses</h5>
              <ul className="intereses__list">
                {userInterests.map((interest) => (
                  <li className="intereses__li">
                    {interest} <CloseIcon className="li__icon" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="profile__contraseña">
            <button className="profile__btnContraseña">
              <LockResetIcon className="btnContraseña__icon" />
              Cambiar contraseña
            </button>
          </div>
        </div>
        <button className="profile__btnGuardar">Actualizar perfil</button>
      </section>
    </section>
  );
};

export default UserData;
