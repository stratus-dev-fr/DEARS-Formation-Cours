import React, { useState } from 'react'

import FileUploader from 'react-firebase-file-uploader'
import * as firebase from 'firebase'
import { useEffect } from 'react'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCHW6oh1tNDXTP5jQvSbAsjI6rMr-RJzpU",
        authDomain: "dears-d37ba.firebaseapp.com",
        databaseURL: "https://dears-d37ba.firebaseio.com",
        projectId: "dears-d37ba",
        storageBucket: "dears-d37ba.appspot.com",
        messagingSenderId: "7279348593",
        appId: "1:7279348593:web:6faaad9582c4449c0d44d0",
        measurementId: "G-WXEFXTCPNF"
    })
}

export default function Account () {
    const fileName = `${new Date().getTime()}.mp4`

    const [info, setInfo] = useState('')
    const [url, setURL] = useState('')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [articles, setArticles] = useState([])

    function handleSuccess () {
        setInfo('Terminé')
        firebase.storage().ref('videos').child(fileName).getDownloadURL().then((e) => setURL(e))
    }

    function handlePublish (e) {
        e.preventDefault()

        if (title !== '' && description !== '') {
            firebase.database().ref('articles/').push({
                title: title,
                description: description
            })

            setInfo('Publié')
        }
    }

    useEffect(() => {
        firebase.database().ref('articles/').on('value', (snapshot) => {
            if (snapshot.exists()) {
                const jsonData = snapshot.toJSON()
                const keys = Object.keys(jsonData)

                setArticles(
                    keys.map((key) => {
                        const element = jsonData[key]
                        return [element.title, element.description]
                    })
                )
            }
        })
    }, [])

    if (window.localStorage.getItem('hasAccount')) {
        return (
            <>
                <h1>Welcome</h1>

                <h2>{info}</h2>

                <hr />

                <p>{url}</p>

                <FileUploader
                    filename={fileName}
                    storageRef={firebase.storage().ref('videos')}
                    onUploadStart={() => setInfo('Commencement')}
                    onUploadSuccess={() => handleSuccess()}
                    onUploadError={() => setInfo('Erreur')}
                    onProgress={(e) => setInfo(e)}
                />

                <hr />

                <h2>Articles</h2>

                <input type="text" placeholder='Titre' onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />

                <button onClick={(e) => handlePublish(e)}>Publier</button>

                <hr />

                <h2>Liste</h2>

                {articles ?
                    <>
                        {articles.map((x) => (
                            <>
                                <h3>{x[0]}</h3>
                                <p>{x[1]}</p>
                            </>
                        ))}
                    </>

                    :

                    <p>Aucun articles</p>
                }
            </>
        )
    }
}