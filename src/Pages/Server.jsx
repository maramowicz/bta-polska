import '/src/index.scss'
import { Header } from "../Components/Header"
import { useState } from 'react'
import { Slideshow } from "../Components/Slideshow"


export default function Server() {
    return (
        <div>
        <Header></Header>

   
        <Slideshow></Slideshow>
        </div>
    )
}