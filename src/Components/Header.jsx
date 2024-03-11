import '/src/index.scss'
import '/src/App.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';





export function Header() {

  const [isDark, setIsDark] = useState('true')

  useEffect(() => {
    const root = document.documentElement;
  
    // Sprawdź wartość isDark i ustaw odpowiednią ścieżkę do obrazu tła
    const backgroundPath = isDark
      ? "/bta-backgroundDark.png"
      : "/bta-backgroundLight.png";
  
    // Ustaw styl tła dla root elementu
    root.style.setProperty('--background-image', `url(${backgroundPath})`);
  }, [isDark]);

  const themeSwap = isDark
  ? "/moon.webp"
  : "/sun2.webp";

  const [activePage, setActivePage] = useState(false)

  const activeHome = 
    activePage == "/" ? "activatedPageStyle" : ""



    useEffect(() => {
      setActivePage(location.pathname);
    }, [location.pathname]);


    return (
   
            <nav className='navbar'>
                <img className='logo-navbar' src='/BTApl.webp'></img>
                <ul className='pages-navbar'>
                    <li>
                        
                        <div className='switcher'>
                            <img onClick={() => setIsDark(isDark === false ? true : false)} src={themeSwap}></img>

                        </div>
                    </li>
                    <li onClick={() => setActivePage(true)} className={`page ${activeHome}`}><Link className="routes" to="/">Home</Link> </li>
                    <li className={`page ${activeHome}`}><Link className="routes" to="/Server">Server</Link></li>
                    <li className='page'>Wiki</li>
                    <li className='page'>Wiecej</li>
            
                </ul>



            </nav>
       
    )
}
