import '/src/index.css'
import '/src/app.css'


export function Header() {
    return (
   
            <nav className='navbar'>
                <img className='logo-navbar' src='./src/assets/BTApl.png'></img>
                <ul className='pages-navbar'>
                    <li className='page'>Home </li>
                    <li className='page'>Server</li>
                    <li className='page'>Wiki</li>
                    <li className='page'>Wiecej...</li>
                </ul>



            </nav>
       
    )
}