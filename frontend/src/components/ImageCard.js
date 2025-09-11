import React from 'react';
import { Card, CardContent } from '@mui/material';

const ImageCard = ({ imageSrc, altText }) => {
  return (
    <Card className="image-card">
      <CardContent style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <img src={imageSrc} alt={altText} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </CardContent>
    </Card>
  );
};

export default ImageCard;
