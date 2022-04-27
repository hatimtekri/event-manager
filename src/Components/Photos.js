import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import { useParams, useHistory } from "react-router-dom";

import "react-image-gallery/styles/css/image-gallery.css";


function Photos() {

  const history = useHistory();

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      history.push("/huffazBarnamaj1443/Login");
    }

  }, []);

  const images = [
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/0.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/0.png',
      originalTitle: "Tarikhi Photo",
      thumbnailTitle: "Tarikhi Photo",
      thumbnailLabel: "Tarikhi Photo",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/1.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/1.png',
      originalTitle: "Saifee",
      thumbnailTitle: "Saifee",
      thumbnailLabel: "Saifee",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/2.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/2.png',
      originalTitle: "Najmi",
      thumbnailTitle: "Najmi",
      thumbnailLabel: "Najmi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/3.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/3.png',
      originalTitle: "Taheri",
      thumbnailTitle: "Taheri",
      thumbnailLabel: "Taheri",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/4.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/4.png',
      originalTitle: "Qutbi",
      thumbnailTitle: "Qutbi",
      thumbnailLabel: "Qutbi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/5.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/5.png',
      originalTitle: "Fakhri",
      thumbnailTitle: "Fakhri",
      thumbnailLabel: "Fakhri",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/6.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/6.png',
      originalTitle: "Dawoodi",
      thumbnailTitle: "Dawoodi",
      thumbnailLabel: "Dawoodi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/7.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/7.png',
      originalTitle: "Mohammedi",
      thumbnailTitle: "Mohammedi",
      thumbnailLabel: "Mohammedi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/8.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/8.png',
      originalTitle: "Tayyebi",
      thumbnailTitle: "Tayyebi",
      thumbnailLabel: "Tayyebi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/9.png',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/9.png',
      originalTitle: "Imadi",
      thumbnailTitle: "Imadi",
      thumbnailLabel: "Imadi",
    },
    {
      original: 'https://mahadalzahra.org/uploads/GroupPhotos/10.jpg',
      thumbnail: 'https://mahadalzahra.org/uploads/GroupPhotos/10.jpg',
      originalTitle: "Burhani",
      thumbnailTitle: "Burhani",
      thumbnailLabel: "Burhani",
    }

  ];

  return (
    <ImageGallery items={images} />
  )
}

export default Photos