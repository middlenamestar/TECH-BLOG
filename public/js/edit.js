const postId = document.querySelector('#post-id').value;

const editPost = async function(event){
    event.preventDefault();
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    await fetch(`/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title.value,
            body: content.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // best wuld b 2 redirect to the specific post page.
    document.location.replace('/my-dash');
};

const deletePost = async function() {
    await fetch(`/post/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/my-dash');
};

document
    .querySelector('#edit-post')
    .addEventListener('submit', editPost);

document
    .querySelector('#delete-btn')
    .addEventListener('click', deletePost);