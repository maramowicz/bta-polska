import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Slideshow() {
    const [slideIndex, setSlideIndex] = useState(1);

    const widthStyle = {
        height: '50vh',
        width: '50vw',
    };

    useEffect(() => {
        showSlides(slideIndex);
    }, [slideIndex]);

    // Next/previous controls
    const plusSlides = (n) => {
        setSlideIndex((prevIndex) => prevIndex + n);
    };

    // Thumbnail image controls
    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    const showSlides = (n) => {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        
        if (n > slides.length) {
            setSlideIndex(1);
        }
        if (n < 1) {
            setSlideIndex(slides.length);
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
       
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            
        }
    };

    return (
        <div>
            <div className="slideshow-container">
                <div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    <img src="/img1.jpg" style={widthStyle} alt="Slide 1"></img>
                    <div className="text">3 Wojowników</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src="/img2.jpg" style={widthStyle} alt="Slide 2"></img>
                    <div className="text">Dzielnica Nobbera</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src="/img3.jpg" style={widthStyle} alt="Slide 3"></img>
                    <div className="text">Statek Wikingów</div>
                </div>

                <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
                <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
            </div>
            <br></br>

            
        </div>
    );
}