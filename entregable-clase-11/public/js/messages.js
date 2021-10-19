const scrollToBottom = () => {
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

const renderMessages = messages => {
    const htmls = messages.map( message => {
        return(`
            <p class="text-white p-0 m-0"> > <span class="fw-bold text-primary">${message.email}</span> [<span class="text-danger">${message.fyh}</span>]: <em class="text-success">${message.text}</em></p>
            `);
    });

    const html = htmls.join(" ");

    document.getElementById('messages').innerHTML = html;
    scrollToBottom();
}


const addMessage = event => {
    event.preventDefault();

    const message = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value
    };

    socket.emit('new-message', message);
    scrollToBottom();

    document.getElementById('text').value = '';

}

const formMessage = document.getElementById('form-message');

formMessage.addEventListener('submit', addMessage);

socket.on('messages', data => {
    renderMessages(data);
});

