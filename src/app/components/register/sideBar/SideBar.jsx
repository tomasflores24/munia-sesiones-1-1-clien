
import Buttons from "./commonSideBar/buttons";
import HomeIcon from '@mui/icons-material/Home';
import "./SideBar.scss" 

export default function SideBar(){

    const buttonData= [
        {title:"Home", icon: <HomeIcon/>},
        {title:"Perfil", icon: <HomeIcon/>},
        {title:"Agenda", icon: <HomeIcon/>},
        {title:"Configuración", icon: <HomeIcon/>},
    ]

    return(
        <>
        <nav className="container">
            <header className="profile-data">
                <img src="Ellipse 7.svg" className="img"/>
                <h2 className="user-data">María Agustina Lahitou</h2>
            </header>
        {buttonData.map(e=>
            <Buttons title={e.title} icon={e.icon} key={e.title} />)}
        </nav>

        </>
    )
}