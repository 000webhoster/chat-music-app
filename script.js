const socket = io();

// Handle chat messages
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.onsubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', input.value);
    input.value = '';
};

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Play YouTube music
document.getElementById('play-button').onclick = () => {
    const url = document.getElementById('youtube-url').value;
    const videoId = new URL(url).searchParams.get('v');
    const playerDiv = document.getElementById('player');
    playerDiv.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
};

// Ask ChatGPT
document.getElementById('gpt-button').onclick = async () => {
    const question = document.getElementById('gpt-input').value;
    const response = await fetch('/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: question })
    });

    const data = await response.json();
    document.getElementById('gpt-response').innerText = data.reply;
};
