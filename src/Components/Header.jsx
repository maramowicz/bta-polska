import '/src/index.css'
import '/src/App.css'
import { useState } from 'react';




export function Header() {

  const [isDark, setIsDark] = useState('true')

  const themeSwap = isDark
  ? "/moon.png"
  : "/sun2.jpg";

  const backgroundSwap = isDark
  ? "/bta-backgroundDark.png"
  : "/bta-backgroundLight.png"
  



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