const signup = async function(event) {
    event.preventDefault();
    const username = document.querySelector('#username');
    const pw = document.querySelector('#pw');
    const response = await fetch ('/user', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: pw.value
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        // alert('sign up successful!');
        document.location.replace('/my-dash');
    } else {
        alert('failed to sign up :(');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signup);