import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DataCard = ({ title, value, unit, status, onClick }) => {
  // Fallback for when data is not yet loaded
  const displayValue = value === null || value === undefined ? '---' : value;
  const displayUnit = value === null || value === undefined ? '' : unit;

  return (
    <Card className={`status-${status || 'good'}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <CardContent>
        <Typography className="card-title" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" className="card-value">
          {displayValue}
          <span className="card-unit">{displayUnit}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DataCard;
