import React, { useEffect } from 'react'

import { TweenMax, TimelineMax } from 'gsap'

export default function GSAP () {
    useEffect(() => {
        const animation = new TimelineMax()

        animation.to(['#title'], 1, { x: 250, opacity: .25 })
        animation.to(['#title'], .75, { x: 150, opacity: .5 })
        animation.to(['#title'], .5, { x: 50, opacity: 1 })

        const animationText = new TimelineMax()

        animationText.to(['#text'], 1, { y: 250, opacity: .25 })
        animationText.to(['#text'], .75, { y: 150, opacity: .5 })
        animationText.to(['#text'], .5, { y: 50, opacity: 1 })

        new TweenMax.staggerFromTo(['#stagger p'], 2, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, .15)
    }, [])

    return (
        <>
            <div id='stagger'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </div>
        </>
    )
}