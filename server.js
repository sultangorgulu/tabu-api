const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const words = require('./words.json');

app.get('/', (req, res) => {
  res.json({
    message: 'Tabu Oyunu API',
    endpoints: {
      getAllWords: '/api/kelimeler',
      getWordsByDifficulty: '/api/kelimeler/:zorluk',
      getRandomWord: '/api/kelimeler/:zorluk/rastgele'
    }
  });
});

app.get('/api/kelimeler', (req, res) => {
  res.json(words);
});

app.get('/api/kelimeler/:zorluk', (req, res) => {
  const zorluk = req.params.zorluk;
  if (words[zorluk]) {
    res.json(words[zorluk]);
  } else {
    res.status(404).json({ error: 'Zorluk seviyesi bulunamadı' });
  }
});

app.get('/api/kelimeler/:zorluk/rastgele', (req, res) => {
  const zorluk = req.params.zorluk;
  if (words[zorluk]) {
    const randomIndex = Math.floor(Math.random() * words[zorluk].length);
    res.json(words[zorluk][randomIndex]);
  } else {
    res.status(404).json({ error: 'Zorluk seviyesi bulunamadı' });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
}); 