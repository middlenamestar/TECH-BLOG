const postComment = async function(event) {
    event.preventDefault();
    const postId = document.querySelector('#post-id');
    const comment = document.querySelector('#comment');
    if(comment) {
        await fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id: postId.value,
                body: comment.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', postComment);