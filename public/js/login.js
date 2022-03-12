const login = async function(event) {
    event.preventDefault();
    const username = document.querySelector('#username');
    const pw = document.querySelector('#pw');
    const response = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: pw.value
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/my-dash');
    } else {
        alert('failed to login :(');
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', login);