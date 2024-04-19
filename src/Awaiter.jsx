import AwaiterStyles from './Awaiter.module.css'
import React, {useEffect, useState} from "react";
import Script from 'react-load-script';

export function Awaiter() {
    const [tgReady, setTGReady] = useState(false)

    useEffect(() => {
        if (!tgReady) return

        if (window.tgAppInited) return
        window.tgAppInited = true

        const scrollableEl = document.getElementById('index')

        const tg = window.Telegram.WebApp

        tg.expand()

        const overflow = 100
        function setupDocument(enable: boolean) {
            if (enable) {
                document.documentElement.classList.add(AwaiterStyles.html)
                document.body.style.marginTop = `${overflow}px`
                document.body.style.height = window.innerHeight + overflow + "px"
                document.body.style.paddingBottom = `${overflow}px`
                window.scrollTo(0, overflow)
            } else {
                document.documentElement.classList.remove(AwaiterStyles.html)
                document.body.style.removeProperty('marginTop')
                document.body.style.removeProperty('height')
                document.body.style.removeProperty('paddingBottom')
                window.scrollTo(0, 0)
            }
        }
        setupDocument(true)

        let ts: number | undefined
        const onTouchStart = (e: TouchEvent) => {
            ts = e.touches[0].clientY
        }
        const onTouchMove = (e: TouchEvent) => {
            if (scrollableEl) {
                const scroll = scrollableEl.scrollTop
                const te = e.changedTouches[0].clientY
                if (scroll <= 0 && ts < te)
                {
                    e.preventDefault()
                }
            } else {
                e.preventDefault()
            }
        }
        document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false })
        document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false })

        const onScroll = () => {
            if (window.scrollY < overflow) {
                window.scrollTo(0, overflow)
                if (scrollableEl) {
                    scrollableEl.scrollTo(0, 0)
                }
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        // authorize here

        return () => {
            setupDocument(false)
            document.documentElement.removeEventListener('touchstart', onTouchStart)
            document.documentElement.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('scroll', onScroll)
        }
    }, [tgReady])

    return <>
        <Script
            url="https://telegram.org/js/telegram-web-app.js"
            onLoad={() => {
                setTGReady(true)
            }}
        />
    </>
}