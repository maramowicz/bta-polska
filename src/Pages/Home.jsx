import '/src/index.scss'
import { Header } from "../Components/Header"
import { useState } from 'react'




export default function Home() {


    const [page, setPage] = useState(0)

    const nextPage = () => {
        setPage( (newPage) => (newPage < 3 ? newPage + 1 : newPage));
    }

    const PrevPage = () => {
        setPage( (oldPage) => (oldPage > 0 ? oldPage - 1 : oldPage))
    }

    



    return (
        <div >
        <Header></Header>
        <div className='mobileWarning'>
            <h1 className='warning'>Uwaga!</h1>
            <p className='warningText'>Mobilna wersja strony nie jest JESZCZE niestety dostepna.
            <br />Aby wejsc na strone otworz ja na komputerze/laptopie 
            <br /> Za utrudnienia przepraszamy!
             </p>
        </div>
        <div className='book'>
            <img className='bookLayout' src='/bookImage.png'></img>
            <div className={`page0 ${page != 0 ? 'hiddenPage' : ''}`}>
            <h1 className='p0title'>Czym jest BTA ?</h1>
            <p className='aboutBTA'>
                Better Than Adventure" (BTA)
            <br/> to obszerny mod do Minecrafta 
            <br/>beta 1.7.3, ktory regularnie
            <br/>  udostepnia aktualizacje, dazac do 
            <br/>stworzenia bardziej "sfinalizowanej" 
            <br/>wersji beta Minecrafta, 
            <br/>jednoczesnie zachowujac wyglad
            <br/> i atmosfere gry sprzed
            <br/> "Adventure Update". BTA dziala
            <br/> inaczej niz inne mody, pelniac role
            <br/> swoistego "forka" Minecrafta,
            <br/> bardziej niz dodatku do niego.
    
            </p>
            <h1 className='p0SecondTitle'>Zerknij tutaj !</h1>
            <iframe className='previewVideo'  src="https://www.youtube.com/embed/0O9maBZ3vI8"></iframe>
            </div>
            <div className={`page1 ${page != 1 ? 'hiddenPage' : ''}`}>
                <h1 className='p1title'>Wprowadzenie</h1>
                <p className='introduction'>
                Minecraft zmienil sie znacznie od czasu swojej wersji beta z 2011 roku. 
                Gra znaczaco sie rozrosla, a nowe funkcje, mechaniki i systemy nadal sa dodawane nawet do dzis. 
                Pomimo ze to wszystko jest w porzadku, sa gracze, ktorzy nie ciesza sie z kierunku, jaki przyjela gra po premierze, 
                albo po prostu tesknia za beta Minecraftem i chcieliby wrocic do czasow bez glodu, 
                doswiadczenia czy enchantow, z kilkoma dodatkami.
                {/* <img className='btaTitleImg' src='/BtaImg.png'></img> */}
                <br />
                 ____________________________________     

                <h2 className='p1secondTitle'>jaki jest cel  ?</h2>
                <p className='introduction2'>Better Than Adventure ma na celu przyciagniecie tych graczy, ktorzy lubia prosta rozgrywke z dawnych wersji beta Minecrafta, 
                a jednoczesnie chca sprobowac czegos nowego i ekscytujacego. Mozna to porownac do "alternatywnego wszechswiata" Minecrafta, 
                ktory stara sie zachowac wyglad i vibe wersji beta 1.7.3, jednoczesnie dodajac nowe funkcje, bloki, biomy i ulatwienia w jakosci rozgrywki. 
                Pomimo tego, co sugeruje nazwa, ten mod niekoniecznie probuje zaoferowac cos lepszego od nowoczesnego Minecrafta, po prostu cos innego.     
                
                </p>    
                </p>
                </div>
            <div className={`page2 ${page != 2 ? 'hiddenPage' : ''}`}>
            <h1 className='p2title'>Wiec...</h1>
            <p className='so'>jezeli czujesz ze te slowa do ciebie przemowily, 
            warto chociaz sprobowac samemu czym jest wlasnie BTA!
            <br />
            <br /> - buduj niesamowite budowle!
            <br /> - odkrywaj nowosci i sekrety tej wersji!
            <br /> - exploruj unikalny swiat i struktury!
            <br /> - graj samemu albo ze znajomymi!
            <br /> - graj na naszym Polskim serverze!
            <br /> - podziwiaj piekne pory roku!
            <br /> 
            <br /> Na nastepnej stronie znajdziesz wszystkie zrodla i linki do pobrania tego niesamowitego projektu. Baw sie dobrze!
        
            </p>
            <h2 className='p2secondTitle'>Na co czekasz?</h2>
            <img className='previewImg' src='/preview.png'></img>
                
            </div>
            <div className={`page3 ${page != 3 ? 'hiddenPage' : ''}`}>
                <h1 className='p3title'>Pobierz tutaj </h1>
                <p className='versionText'> Najnowsza wersja: 1.7.7.0_02
          <br /><p className='download'>
                    Instancja BTA MultiMc:</p> <a className='InstanceDownload' href='https://github.com/Better-than-Adventure/bta-download-repo/releases/download/v1.7.7.0_02/1.7.7.0_02.zip'>kliknij tutaj</a>
                <p className='download2'>
                    MultiMc Launcher: <a className='multiMcDownload' href='https://files.multimc.org/downloads/mmc-develop-win32.zip'>kliknij tutaj</a>
                </p>
                </p>
                <div className='tutorial'>
                <p className='whatNext'>Co dalej?</p>
                
                <ul className='points'>
                <li className='point'>Zainstaluj i zaloguj sie do launchera MultiMc</li>
                <li className='point'>przeciagnij folder instancji (ten pobrany) do launchera.</li>
                <li className='point'>Brawo! ciesz sie rozgrywka.</li>
                </ul>
                </div>

                <h1 className='P3secondTitle'>Community</h1>



            </div>
            <img onClick={PrevPage} src='/arrow.png' className='ArrowLeft'></img>
            <img onClick={nextPage}  src='/arrow.png' className='ArrowRight'></img>
            
        </div>

        </div>
    )
}