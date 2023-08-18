exports.renderComments = (comments) => {
    let responseHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="/static/styles.css"> 
    </head>
    <body>
        <h3>Add a comment:</h3>
        <form action="/" method="post" class="comment-form">
        <label>Comment:</label><br>
        <textarea name="texto" required></textarea><br><br>
        <input type="submit" value="Submit Comment">
    </form>
    `;

    comments.forEach(comment => {
        responseHTML += `<div class="comment"><strong>${comment.username}:</strong> ${comment.comment}</div>`;
    });

    responseHTML += `
    </body>
    </html>
    `;

    return responseHTML;
};
