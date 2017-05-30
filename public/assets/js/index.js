//IMPORTANT TODO:  This is just a sample from the May13 'blog' project, grabs and displays posts.
// We can use as template for badge feed (grabbing and  displaying all badge posts
// ***HEAVY EDITS NEEDED***

$(document).ready(function() {
  function getPosts(category) {
    $.get("/display", function(data) {
    });
  }

  getPosts();

});
