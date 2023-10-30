import StarIcon from "@mui/icons-material/Star";

const CardProfesional = () => {
  return (
    <div className="section2__container">
      <div className="section2__containerImage">
        <img
          src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg"
          alt="psicologo"
          className="section2__img"
        />
      </div>
      <div className="section2__data">
        <h5 className="section2__name">
          <b>Maria Agustina Lahitou</b>
        </h5>
        <p className="section2__paragraph">
          Enfoque: <b>Integrativo</b>
        </p>
        <p className="section2__paragraph">
          Nacionalidad: <b>Argentina</b>
        </p>
        <p className="section2__paragraph">
          Cedula: <b>54678</b>
        </p>
      </div>
      <div className="section2__rating">
        <StarIcon className="starIcon" />
        <p className="section2__paragraph">
          <b>3.9 / 5.0</b>
        </p>
      </div>
    </div>
  );
};

export default CardProfesional;
