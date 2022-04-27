import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import { useParams, useHistory } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";


function GeneralPhotos() {
  
  const history = useHistory();

  useEffect(() =>{

    if(!localStorage.getItem("token"))
    {
      history.push("/huffazBarnamaj1443/Login");
    }

  },[]);

    const images = [
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/1.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/1.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/2.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/2.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/3.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/3.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/4.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/4.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/5.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/5.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/6.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/6.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/7.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/7.jpg',
        },
        {
          original: 'https://mahadalzahra.org/uploads/GeneralPhotos/8.jpg',
          thumbnail: 'https://mahadalzahra.org/uploads/GeneralPhotos/8.jpg',
        },
        
        
      ];

  return (
    <ImageGallery items={images} />
  )
}

export default GeneralPhotos