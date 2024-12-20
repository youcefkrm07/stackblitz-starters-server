const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/api/retrieve', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const response = await fetch('https://paiement.algerietelecom.dz/AndroidApp/dette_paiement.php', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic VEdkNzJyOTozUjcjd2FiRHNfSGpDNzg3IQ==',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `ndco20=${phoneNumber}&validerco20=Confirmer&nfactco20=`
    });

    const data = await response.text(); // Use .json() if the API returns JSON
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to connect to the server' });
  }
});

app.listen(3000, () => console.log('Proxy running on http://localhost:3000'));
