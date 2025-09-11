import React from 'react';
import './Footer.css';
import fapemigImage from '../assets/images/Fapemig.png';
import licaImage from '../assets/images/Lica.png';
import ppgmcsImage from '../assets/images/PPGMCS.png';
import unimontesImage from '../assets/images/Unimontes.png';
import sertaoMineiroImage from '../assets/images/Sertao_Mineiro.png'; // New import
import ImageCard from './ImageCard';

const Footer = () => {
    return (
        <footer className="footer">
            
            <div className="image-cards-container">
                <ImageCard imageSrc={sertaoMineiroImage} altText="Sertão Mineiro Logo" /> {/* Moved to first position */}
                <ImageCard imageSrc={unimontesImage} altText="Unimontes Logo" />
                <ImageCard imageSrc={ppgmcsImage} altText="PPGMCS Logo" />
                <ImageCard imageSrc={licaImage} altText="LICA Logo" />
                <ImageCard imageSrc={fapemigImage} altText="FAPEMIG Logo" />
            </div>
        </footer>
    );
};

export default Footer;
