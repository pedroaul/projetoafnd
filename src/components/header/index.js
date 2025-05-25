import { RiFileEditLine } from 'react-icons/ri';
import './header.css';
import { IoIosHome } from 'react-icons/io';
import { GiOpenBook } from 'react-icons/gi';

function Header() {
    return(
        <header>
            <div className='headerMain'>
                <div className='btn'>
                    <IoIosHome className='icons'/>
                    <a className='btMenu'>Inicio</a>
                </div>
                <div className='btn'>
                    {<GiOpenBook className='icons'/>}
                    <a className='btMenu'>Sobre</a>
                </div>
                <div className='btn'>
                    {<RiFileEditLine className='icons'/>}
                    <a className='btMenu'>Crie o seu</a>
                </div>
            </div>
        </header>
    );
}

export default Header;