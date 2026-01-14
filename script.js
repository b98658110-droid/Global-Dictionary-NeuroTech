async function loadWords() {
    const res = await fetch('/api/words');
    const words = await res.json();
    const list = document.getElementById('wordList');
    list.innerHTML = '';

    words.forEach(word => {
        const div = document.createElement('div');
        div.className = 'word-card';
        div.innerHTML = `<b>${word.english}</b> — ${word.russian}`;
        list.appendChild(div);
    });
}

async function addWord() {
    const english = document.getElementById('engWord').value;
    const russian = document.getElementById('rusWord').value;

    if (!english || !russian) return alert('Заполни поля!');

    await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ english, russian })
    });

    document.getElementById('engWord').value = '';
    document.getElementById('rusWord').value = '';
    loadWords(); // Обновляем список
}

// Загружаем слова при открытии страницы
loadWords();
// Авто-обновление каждые 5 секунд, чтобы видеть слова других пользователей
setInterval(loadWords, 5000);