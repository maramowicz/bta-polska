import '/src/index.css'
import { Link, useLocation } from "react-router-dom";


export default function Home() {
    return (
        <div>
        <div>
            <Link to="/informacja">
             Tekst Testowy aka Lorem Ipsum
             </Link>

        </div>
        {/* Test */}
        <div>
        <a href="./src/startserv/starter.html">
                <p>Uruchom server</p>
                 </a>


        </div>
        
        </div>
            
    )
}