import Link from 'next/link'
import React from 'react'
import FacebookIcon from '../Icons/FacebookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import WhatsappIcon from '../Icons/WhatsappIcon'

export default function Footer() {
    return (
        <footer className='p-5 py-10 md:py-5 bg-zinc-300 border-t border-t-solid border-t-zinc-500 flex justify-around items-center flex-wrap gap-10'>
            <ul>
                <li><Link href="/acerca-de-nosotros">Acerca de Nosotros</ Link></li>
                <li><Link href="/politica-de-privacidad">Política de Privacidad</ Link></li>
                <li><Link href="/pedidos-y-devoluciones">Pedidos y devoluciones</ Link></li>
                <li><Link href="/contactenos">Contáctenos</ Link></li>
                <li><Link href="/mapa-de-sitio">Mapa de sitio</ Link></li>
            </ul>
            <ul>
                <li>Dirección: Calle 0 B # 0 - 0 Of. 0</li>
                <li>Bogotá Colombia</li>
                <li>Teléfono 1: (+601) 000 000</li>
                <li>Teléfono 2: (+60) 350 000 0000</li>
                <li>E-mail: info.co@gmail.com</li>
            </ul>
            <div className='w-full md:w-auto flex justify-center lg:justify-start gap-10 lg:gap-14'>
                <a href="https://www.facebook.com" target='_blank'><FacebookIcon className="scale-200 lg:scale-300"/></a>
                <a href="https://www.instagram.com/aromasdutyfreesai/" target='_blank'><InstagramIcon className="scale-200 lg:scale-300" /></a>
                <a href="https://www.whatsapp.com" target='_blank'><WhatsappIcon className="scale-200 lg:scale-300" /></a>
            </div>
        </footer>
    )
}
