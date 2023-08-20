import SideBar from '../../components/sideBar/SideBar';
import './Home.scss'

const Home = () => {


    return (
        <div className='HomeContainer'>
            <SideBar />
            <div className='ContainAll'>
                <div className='containerTop'>
                    <div className='container1Top'>
                        <div className='titleTop'>
                            <p>Promedio de sesiones por psicólogo/paciente.</p>
                        </div>
                        <div className='BoxTop'>
                            <p>5</p>
                        </div>
                    </div>
                    <div className='container1Top'>
                        <div className='titleTop'>
                            <p>sesiones programadas y realizadas en el año</p>
                        </div>
                        <div className='BoxTop'>
                            <p>547</p>
                        </div>
                    </div>
                    <div className='container1Top'>
                        <div className='titleTop'>
                            <p>Total de cancelación y reprogramación de citas.</p>
                        </div>
                        <div className='BoxTop'>
                            <p>113</p>
                        </div>
                    </div>
                    <div className='container1Top'>
                        <div className='titleTop'>
                            <p>Cantidad de psicólogos registrados en la plataforma.</p>
                        </div>
                        <div className='BoxTop'>
                            <p>15</p>
                        </div>
                    </div>
                </div>
                <div className='containerMid'>
                    <div className='BoxMid1'>
                        <div className='titleMid1'>
                            <p>Resumen de comentarios y opiniones de los pacientes</p>
                        </div>
                        <div className='BoxCards1'>
                            <div className='Cards1'>
                                <div className='CardsTitle1'>
                                    <p>Juan Pablo Osudar - 17/8/23</p>
                                </div>
                                <div className='CardsDesc1'>
                                    <div className='BoxDescText1'>
                                        <p>Estoy realmente satisfecho con las sesiones. El enfoque comprensivo y las estrategias proporcionadas han mejorado mi perspectiva y bienestar.</p>
                                    </div>
                                    <div className='BoxDescImg1'>
                                        STAR
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='BoxCards1'>
                            <div className='Cards1'>
                                <div className='CardsTitle1'>
                                    <p>Joel Ochoa - 17/8/23</p>
                                </div>
                                <div className='CardsDesc1'>
                                    <div className='BoxDescText1'>
                                        <p>Mi terapeuta ha sido un apoyo invaluable en mi viaje emocional. Sus enfoques personalizados y empatía genuina han marcado una diferencia positiva en mi bienestar mental.</p>
                                    </div>
                                    <div className='BoxDescImg1'>
                                        STAR
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='BoxCards1'>
                            <div className='Cards1'>
                                <div className='CardsTitle1'>
                                    <p>Juan Camilo Moreno - 16/8/23</p>
                                </div>
                                <div className='CardsDesc1'>
                                    <div className='BoxDescText1'>
                                        <p>No encontré la conexión que esperaba con mi terapeuta. Las sesiones a menudo se sintieron superficiales y carecían de dirección en mi proceso de sanación.</p>
                                    </div>
                                    <div className='BoxDescImg1'>
                                        STAR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <div>
                                <p>Citas recientes programadas</p>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <p>Pedro Terraf</p>
                                        <div>
                                            <p>Mie. 16 - 08 - 2023</p>
                                            <p>13:30 pm</p>
                                        </div>
                                        <p>Rafael Santandreu</p>
                                    </div>
                                    <div>
                                        <p>Juan Pablo Osudar</p>
                                        <div>
                                            <p>Mie. 16 - 08 - 2023</p>
                                            <p>13:30 pm</p>
                                        </div>
                                        <p>María Agustina Lahitou</p>
                                    </div>
                                    <div>
                                        <p>Juan Camilo Moreno</p>
                                        <div>
                                            <p>Mie. 16 - 08 - 2023</p>
                                            <p>10:30 am</p>
                                        </div>
                                        <p>Rafael Santandreu</p>
                                    </div>
                                    <div>
                                        <p>Joel Ochoa</p>
                                        <div>
                                            <p>Mie. 16 - 08 - 2023</p>
                                            <p>10:30 am</p>
                                        </div>
                                        <p>María Agustina Lahitou</p>
                                    </div>
                                    <div>
                                        <button>Ver todas las citas programadas</button>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <p>Total de citas programadas para hoy.</p>
                                        </div>
                                        <div>
                                            <p>10</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p>Total de citas canceladas hoy.</p>
                                        </div>
                                        <div>
                                            <p>5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default Home;