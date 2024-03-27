import { useState, useEffect } from 'react';

function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/health')
      .then(response => response.text())
      .then(message => setHealthStatus(message))
      .catch(error => console.error('Error fetching health status:', error));
  }, []);

  return <div>{healthStatus || 'Healthy Backend'}</div>;
}

export default HealthCheck;
