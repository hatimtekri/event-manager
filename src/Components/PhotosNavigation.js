import React, { useState, useEffect } from 'react'
var CryptoJS = require("crypto-js");

function PhotosNavigation() {

    const [text, setText] = useState('');

    useEffect(() => {
        // let ciphertext = CryptoJS.AES.encrypt("Hatim", 'my-secret-key@123').toString();

        // console.log('Encrypt Data -')
        // console.log(ciphertext);


        // let bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
        // let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        // console.log('decrypted Data -')
        // console.log(decryptedData);


        const pdfView = document.querySelector("#pdfView");

        fetch("https://mahadalzahra.org/uploads/MZ_Student_Privacy_Policy.pdf")
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer())
            .then(myBytes => {
                const totalBlob = new Blob([myBytes], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(totalBlob);
               // const anchor = document.createElement("a");
               // anchor.href = url;
               // anchor.download = `document.pdf`;
               // anchor.click();
               // anchor.textContent = 'Download'
               // document.body.appendChild(anchor);

                pdfView.src = url;
                console.log(url);
            })




    }, [])





    return (
        <div>

            <iframe id="pdfView" src="" type="application/pdf" width="100%" height="100%" style={{overflow: "auto"}}>
            </iframe>
        </div>
    )
}

export default PhotosNavigation