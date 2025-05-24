import { RiFileEditLine } from 'react-icons/ri';
import './header.css';
import { IoIosHome } from 'react-icons/io';
import { GiOpenBook } from 'react-icons/gi';

function Header() {
    return(
        <header>
            <div className='headerMain'>
                <a className='btMenu'><IoIosHome className='icons'/>Inicio</a>
                <a className='btMenu'>{<GiOpenBook className='icons'/>}Sobre</a>
                <a className='btMenu'>{<RiFileEditLine className='icons'/>}Crie o seu</a>
            </div>
        </header>
    );
}

export default Header;