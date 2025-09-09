// Simple API test file
const testAPI = async () => {
  try {
    console.log('Testing API...');
    
    // Test locations endpoint
    const response = await fetch('https://demo.jobsoid.com/api/v1/locations');
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Locations data:', data);
      console.log('Number of locations:', data.length);
    } else {
      console.error('API Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

// Run the test
testAPI();
