// Simple test script to verify backend API is working
const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api/v1';

async function testBackend() {
  console.log('🧪 Testing Backend API Connection...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.data.status);
    console.log('   Version:', healthResponse.data.data.version);
    console.log('');

    // Test 2: Stats
    console.log('2️⃣ Testing Stats Endpoint...');
    const statsResponse = await axios.get(`${API_BASE_URL}/stats`);
    console.log('✅ Stats Retrieved:');
    console.log('   Total Projects:', statsResponse.data.data.total_projects);
    console.log('   CO2 Saved:', statsResponse.data.data.co2_saved);
    console.log('   Partners:', statsResponse.data.data.partner_count);
    console.log('');

    // Test 3: Categories
    console.log('3️⃣ Testing Categories Endpoint...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/categories`);
    console.log('✅ Categories Retrieved:', categoriesResponse.data.data.length, 'categories');
    console.log('');

    // Test 4: Tags
    console.log('4️⃣ Testing Tags Endpoint...');
    const tagsResponse = await axios.get(`${API_BASE_URL}/tags`);
    console.log('✅ Tags Retrieved:', tagsResponse.data.data.length, 'tags');
    console.log('');

    // Test 5: Projects
    console.log('5️⃣ Testing Projects Endpoint...');
    const projectsResponse = await axios.get(`${API_BASE_URL}/projects`);
    console.log('✅ Projects Retrieved:', projectsResponse.data.data.data?.length || 0, 'projects');
    console.log('');

    // Test 6: Team
    console.log('6️⃣ Testing Team Endpoint...');
    const teamResponse = await axios.get(`${API_BASE_URL}/team`);
    console.log('✅ Team Members Retrieved:', teamResponse.data.data.length, 'members');
    console.log('');

    // Test 7: Partners
    console.log('7️⃣ Testing Partners Endpoint...');
    const partnersResponse = await axios.get(`${API_BASE_URL}/partners`);
    console.log('✅ Partners Retrieved:', partnersResponse.data.data.length, 'partners');
    console.log('');

    console.log('🎉 All Backend Tests Passed!\n');
    console.log('✨ Backend is ready for frontend integration!');

  } catch (error) {
    console.error('❌ Backend Test Failed:');
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Message:', error.response.data?.message || error.message);
    } else if (error.request) {
      console.error('   No response received. Is the backend running?');
      console.error('   Make sure to start the backend with: cd backend && php artisan serve');
    } else {
      console.error('   Error:', error.message);
    }
    process.exit(1);
  }
}

testBackend();
