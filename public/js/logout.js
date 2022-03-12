const logout = async function() {
    const response = await fetch('/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/');
        // alert('logged out');
    } else {
        alert('failed 2 log out :(');
    }
};

document
    .querySelector('#logout-link').addEventListener('click', logout);