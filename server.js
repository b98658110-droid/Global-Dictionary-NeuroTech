// server.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

let words = []; // Здесь хранятся слова: { english: 'apple', russian: 'яблоко' }

// Получить список всех слов
app.get('/api/words', (req, res) => {
    res.json(words);
});

// Добавить новое слово
app.post('/api/words', (req, res) => {
    const { english, russian } = req.body;
    if (english && russian) {
        words.push({ english, russian });
        // Сортировка по алфавиту (английское слово)
        words.sort((a, b) => a.english.localeCompare(b.english));
        res.status(201).json({ success: true });
    } else {
        res.status(400).json({ error: 'Заполните все поля' });
    }
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));