import React from 'react';

const ErrorComponent: React.FC<{message: any, size?: any}> = ({ message, size }) => {
    if( !size ){
        size  = '130px'
    }
     return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <span role="img" aria-label="poop" style={{ fontSize: size }}>💩</span>
      <p style={{ marginTop: '10px', width: 'auto', whiteSpace: 'pre-wrap' }}>{message}</p>
    </div>
  );
};

export default ErrorComponent;
//💩