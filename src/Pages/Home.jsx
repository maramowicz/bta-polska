import BackgroundCanvas from '../BackgroundCanvas';
import '/src/index.css'
import { Link, } from "react-router-dom";


export default function Home() {
    return (
        <div>
<BackgroundCanvas />

        <div>
            <Link to="/informacja">
             Tekst Testowy aka Lorem Ipsum
             </Link>

        </div>


        
        </div>
            
    )
}