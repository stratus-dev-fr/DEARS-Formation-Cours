import React, { useEffect } from 'react'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from 'three'

export default function Three () {
    useEffect(() => {
        let x = 0
        let y = 0

        const scene = new THREE.Scene()
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)
        const controls = new OrbitControls(camera, renderer.domElement)

        renderer.setClearColor('#f0f0f0')
        renderer.setSize(window.innerWidth, window.innerHeight)
        controls.update()

        camera.position.z = 5

        const light = new THREE.PointLight(0xffffff, 1)

        light.position.set(0, 10, 20)

        scene.add(light)

        const directory = './scene.gltf'

        const loader = new GLTFLoader()
        const draco = new DRACOLoader()

        draco.setDecoderPath(directory)

        loader.setDRACOLoader(draco)

        let model

        loader.load(directory, (e) => {
            scene.add(e.scene)

            model = e.scene
        }, undefined, (e) => {
            throw e
        })

        const animate = () => {
            requestAnimationFrame(animate)

            if (model) {
                model.position.x = x * .008
                model.position.y = y * .008

                model.rotation.y += .005
            }

            renderer.render(scene, camera)
        }

        animate()

        window.addEventListener('mousemove', (e) => {
            x = e.clientX - (window.innerWidth / 2)
            y = e.clientY - (window.innerHeight / 2)
        })

        document.getElementById('three').appendChild(renderer.domElement)
    }, [])

    return (
        <div id='three'></div>
    )
}