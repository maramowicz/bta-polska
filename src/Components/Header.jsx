import '/src/index.scss'
import '/src/App.css'
import { useState } from 'react';
import { useEffect } from 'react';





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
  ? "/moon.png"
  : "/sun2.jpg";

 



    return (
   
            <nav className='navbar'>
                <img className='logo-navbar' src='/BTApl.jpg'></img>
                <ul className='pages-navbar'>
                    <li>
                        
                        <div className='switcher'>
                            <img onClick={() => setIsDark(isDark === false ? true : false)} src={themeSwap}></img>

                        </div>
                    </li>
                    <li className='page'>Home </li>
                    <li className='page'>Server</li>
                    <li className='page'>Wiki</li>
                    <li className='page'>Wiecej...</li>
            
                </ul>



            </nav>
       
    )
}