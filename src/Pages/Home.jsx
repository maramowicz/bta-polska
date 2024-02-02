import '/src/index.scss'
import { Header } from "../Components/Header"




export default function Home() {



    return (
        <div >
        <Header></Header>
        <div className='book'>
            <img className='knyha' src='/ksiazeczka.png'></img>
            <h1 className='p1title'>Czym jest BTA ?</h1>
            <p className='aboutBTA'>Better Than Adventure" (BTA)<br/> to obszerny mod do Minecrafta <br/>beta 1.7.3, ktory regularnie<br/>  udostepnia aktualizacje, dazac do <br/>stworzenia bardziej "sfinalizowanej" <br/>wersji beta Minecrafta, <br/>jednoczesnie zachowujac wyglad<br/> i atmosfere gry sprzed<br/> "Adventure Update". BTA dziala<br/> inaczej niz inne mody, pelniac role<br/> swoistego "forka" Minecrafta,<br/> bardziej niz dodatku do niego.</p>
            <h1 className='p1SecondTitle'>Zerknij tutaj !</h1>
            <iframe className='previewVideo' width="420" height="315" src="https://www.youtube.com/embed/0O9maBZ3vI8"></iframe>
        </div>

        </div>
    )
}