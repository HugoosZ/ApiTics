import axios from 'axios';

const THINGSBOARD_BASE_URL = 'https://YOUR_THINGSBOARD_INSTANCE_URL';
const DEVICE_ID = 'a9672cd0-38d7-11ef-8286-cf8f93908d20';
const ACCESS_TOKEN = 'ApUiFKU4QdwtheVCZdpo';

export const getTelemetryData = async () => {
  try {
    const response = await axios.get(`${THINGSBOARD_BASE_URL}/api/plugins/telemetry/DEVICE/${DEVICE_ID}/values/timeseries`, {
      headers: {
        'X-Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching telemetry data:', error);
    throw error;
  }
};
