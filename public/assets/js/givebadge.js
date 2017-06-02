$(document).ready(function() {

  // Getting jQuery references to the post commenty, badgeId and recipient
      var badgeRecipient = $("#autocomplete-input");
      var badgeSubmitForm = $("#badge-form");
      var badgeComment = $("#comment");

// Autocomplete helps user find recipient; although it does not prevent user from sending badge to random people. Names and images are hard-coded, which is not ideal, but for now it works. Is there a Sequelize statement to add?
  $("input.autocomplete").autocomplete({
    data: {
        "Adam McNerney": "/assets/images/profilePictures/Adam.png",
        "Michelle Didier": "/assets/images/profilePictures/Michelle.png",
        "Rebecca Palmore": "/assets/images/profilePictures/Rebecca.png",
        "Susan Heiniger": "/assets/images/profilePictures/Susan.png",
        "Yilin Xu": "/assets/images/profilePictures/Yilin.png",
        "Ethan Romba": "/assets/images/profilePictures/Ethan.png",
        "Steven Daoud": "/assets/images/profilePictures/Steven.png",
        "Chris Mendoza": "/assets/images/profilePictures/Chris.png"
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  $(badgeSubmitForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    var badgeType = $(':radio[name=badge-group]:checked').val();

    // Wont submit the badge if we are missing a body or a title
    if (!badgeComment.val().trim() || !badgeType || !badgeRecipient.val().trim()) {
      return;
    }    
    var newBadge = {
          recipient_name: badgeRecipient.val().trim(),
          badgeid: badgeType,
          badgeurl: "/assets/images/badges/" + badgeType + ".svg",
          comment: badgeComment.val().trim()
    }
    submitBadge(newBadge);
    })


// Validate recipient is in database. If they are not in database: Alert user and clear out recipient name field.
// TODO: FIX THIS. It is not working at present. See GIVEBADGE.JS for notes.

// $(badgeRecipient).on("change", function(event) {
//     event.preventDefault();
//    $.post("/checkname", user, function(data) {
//         if (data === true) {
//           console.log("Great!");
//         } else if (data === "invalid") {
//           console.log("Shucks!");
//           alert("There is no Plaudit user with that name. Please try again.")
//           $(badgeRecipient).val("");
//         };

//     });

// });


  $(".nav-search").autocomplete({
    data: {
        "Adam McNerney": "/assets/images/profilePictures/Adam.png",
        "Michelle Didier": "/assets/images/profilePictures/Michelle.png",
        "Rebecca Palmore": "/assets/images/profilePictures/Rebecca.png",
        "Susan Heiniger": "/assets/images/profilePictures/Susan.png",
        "Yilin Xu": "/assets/images/profilePictures/Yilin.png",
        "Ethan Romba": "/assets/images/profilePictures/Ethan.png",
        "Steven Daoud": "/assets/images/profilePictures/Steven.png",
        "Chris Mendoza": "/assets/images/profilePictures/Chris.png"
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });


  // Adding an event listener for when the form is submitted
  $(".super-search").on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    var userSearched = $('.nav-search').val().trim();
    // Wont submit the search if text box blank are missing a body or a title
    if (!userSearched) {
      console.log("no search done")
      return;
    }    
    console.log("searching", userSearched);
    searchUser(userSearched);
    })
    
  // Submits a new badge and brings user to feed page upon completion
  function submitBadge(Badge) {
    $.post("/badge/post", Badge, function(req,res){
      window.location.href = "/index";
    });
  }
  //searches for a user, displays that user's profile page.
  function searchUser(user) {
    var searchLink = "/profile/" + user;
    window.location.href = searchLink;
  }

});
