import { useState, useEffect } from 'react';

function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    fetch('http://fridge-butler-env.eba-85rzizg4.eu-central-1.elasticbeanstalk.com/health')
      .then(response => response.text())
      .then(message => setHealthStatus(message))
      .catch(error => console.error('Error fetching health status:', error));
  }, []);

  return <div>{healthStatus || 'Hello Backend'}</div>;
}

export default HealthCheck;
