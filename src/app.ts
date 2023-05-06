import express from 'express';
import axios from 'axios';

const app = express();
const octoprintApiKey = 'C46964C92A8B40C0B331AB1AA5441C46';
const octoprintBaseUrl = 'http://192.168.0.14';

app.get('/printer', async (req, res) => {
  try {
    const response = await axios.get(`${octoprintBaseUrl}/api/printer`, {
      headers: { 'X-Api-Key': octoprintApiKey },
    });

    const { state, temperature } = response.data;

    res.send(`Stan drukarki: ${state.text}, temperatura narzędzia: ${temperature.tool0.actual}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Błąd podczas pobierania informacji o drukarce 3D');
  }
});

app.listen(3000, () => {
  console.log('Serwer nasłuchuje na porcie 3000');
});
