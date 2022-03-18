const newPost = async function(event) {
    event.preventDefault();
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const response = await fetch('/post', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: content.value
        }),
        headers: {'Content-Type': 'application/json'}
    });
    document.location.replace('/my-dash');
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPost);