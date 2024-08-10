const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  'https://buydfcixlsvdqbqrazph.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1eWRmY2l4bHN2ZHFicXJhenBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzMjQxMzYsImV4cCI6MjAyNTkwMDEzNn0.9dGfT2VFe9EYLa96c12T7SmoXOxoARqiQruEyCpuMt8'
);

async function getApiKey() {

    
  const { data, error } = await supabase
    .from('Companies')
    .select('*')
    .eq('name', 'moyasar')
    .single();
    
  if (error) {
    console.error('Supabase error:', error.message);  // Log detailed Supabase error
    throw new Error('Failed to fetch API key from Supabase');
  }
  
  if (!data || !data.api_key) {
    throw new Error('API key not found');
  }

  return data.api_key;
}

exports.refundPayment = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const apiKey = await getApiKey();

    const response = await axios.post(
      `https://api.moyasar.com/v1/payments/${id}/refund`,
      { amount },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: apiKey,
          password: '',
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error during refund process:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      message: 'Failed to refund payment',
      error: error.response ? error.response.data : error.message,
    });
  }
};
