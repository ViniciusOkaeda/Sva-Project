import { useEffect, useState, useRef } from "react";

import OptionsUser from '../optionsUser';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import './index.css';


const Menu = () => {

    let dropDownRef = useRef();
    const [isActive, setIsActive] = useState(false);
    
    const handleOpenDropDown = () => setIsActive(!isActive);

    useEffect(() => {
        let handler = (e) => {
            if(!dropDownRef.current.contains(e.target)){
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }

    },[])

    return(
        <div className="menuContent">


            <div className="menuConfig">
                <div className="menuConfigImage" />
                
                    <a href="/dashboard">
                        <div className="menuConfigItems"> 
                            <div className="menuConfigIconContent"><DashboardIcon className="menuIcon" sx={{ fontSize: '2.1em'}}/></div>
                            <div  className="menuConfigTextContent"><p>Dashboard</p></div>
                        </div>
                    </a>

                    <a href="/sva">
                        <div className="menuConfigItems"> 
                            <div className="menuConfigIconContent"><QueuePlayNextIcon className="menuIcon" sx={{ fontSize: '2.1em'}}/></div>
                            <div className="menuConfigTextContent"><p>Produtos Digitais</p></div>
                        </div>
                    </a>

            </div>

            <div className="menuConfigMobile">
                <div ref={dropDownRef} className="menuConfigItems2">
                    <MenuIcon onClick={handleOpenDropDown} className="menuIconMobile" sx={{ fontSize: '2.1em'}}/>
                <nav 
                    className={`optionsMobile ${isActive ? "active" : "inactive"}`}
                >
                    <ul>
                        <a href="/dashboard?token=3251316"><li><DashboardIcon /><p>Dashboard</p></li></a>
                        <a href="/sva" ><li><QueuePlayNextIcon /><p>SVA's</p></li></a>
                    </ul> 
                </nav>
                </div>


                <div className="menuConfigItems2">
                    <div className="menuContentUserOptions"><OptionsUser /></div>
                </div>
            </div>

        </div>
    );
}

export default Menu;