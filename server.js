const express = require('express');
const TuyaController = require('./TuyaController');

const app = express();
const port = 3030;

app.use(express.json());

// Endpoint to send a command to the device
app.post('/devices/:infrared_id/:remote_id/command', async (req, res) => {
  try {
    const { infrared_id, remote_id } = req.params;
    const { code, value } = req.body;
    const result = await TuyaController.setDeviceProperty(infrared_id, remote_id, code, value);
    res.json({ message: 'Command sent successfully', result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get the status of the device
app.get('/devices/:infrared_id/:remote_id/status', async (req, res) => {
  try {
    const { infrared_id, remote_id } = req.params;
    const result = await TuyaController.getDeviceStatus(infrared_id, remote_id);
    res.json( result );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
