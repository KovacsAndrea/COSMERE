import React from 'react';
import './errorComponent.css'
const ErrorComponent: React.FC<{message: any, size?: any}> = ({ message, size }) => {
    if( !size ){
        size  = '130px'
    }
     return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className='error-component-logo'> </div>
      <p style={{ marginTop: '10px', width: 'auto', whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
  );
};

export default ErrorComponent;
//💩