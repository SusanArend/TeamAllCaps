$(document).ready(function(){

	// // Materialize modal open/close
	// $('.modal').modal();
	
	// // Greensock intro animation
	// var tl = new TimelineLite, 
	// mySplitText = new SplitText("#intro-text", {type:"words,chars"}), 
	// words = mySplitText.words; //an array of all the divs that wrap each character
	
	// TweenLite.set("#intro-text", {perspective:400});
	// tl.staggerFrom(words, 1.5, {opacity:0, scale:3, x:20, rotationX:50, transformOrigin:"0% 100% 300",  ease:Back.easeOut}, 0.1, "+=0")
	// .to("#intro-text", .8, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=1")
	// .to("#intro-text", .8, {display: "none", scale:1.75, ease:Back.easeOut}, "-=.75")
	// .from("#sign-in", .6, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=0");
	
	// //ONE PAGE SMOOTH SCROLL//
	
	// // Select all links with hashes
	// $('a[href*="#"]')
	// // Remove links that don't actually link to anything
	// .not('[href="#"]')
	// .not('[href="#0"]')
	
	// .click(function(event) {
	// // On-page links
	// if (
	// 	location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
	// 	&& 
	// 	location.hostname == this.hostname
	// 	) {
	// 	// Figure out element to scroll to
	// 	var target = $(this.hash);
	// 	target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	// 	// Does a scroll target exist?
	// 		if (target.length) {
	// 	 	// Only prevent default if animation is actually going to happen
	// 	        event.preventDefault();
	// 	        $('html, body').animate({
	// 	        scrollTop: target.offset().top
	// 	        }, 1000, function() {
	// 	            // Callback after animation
	// 	            // Must change focus!
	// 	            var $target = $(target);
	// 	            $target.focus();
	// 	            if ($target.is(":focus")) { // Checking if the target was focused
	// 	                // res.json(true);
	// 	            } else {
	// 	                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	// 	                $target.focus(); // Set focus again
	// 	            };
	// 	        });
	// 	    };
	// 	};
	// });


	// $("#user-login").on("click", function(event){
	// 	event.preventDefault();
	// 	var user = {
	// 		email: $("#existing-email").val().trim(),
	// 		password: $("#existing-password").val().trim()
	// 	};
	// 	$.post("/login/post", user, function(data){
	// 		if(data==="wrong password"){
	// 			alert("you entered wrong password");
	// 		}else if(data ==="invalid email"){
	// 			alert("you entered invalid email");
	// 		}else if (data === true){
	// 			alert("successfully log in");
	// 		};
	// 		$("#existing-email").val("");
	// 		$("#existing-password").val("");
	// 	})
	// });
	//TODO:  Had to comment out this function for now, having trouble getting passport to work without reading 'form' action in landing view.
	//Currently most of this happens automatically even without the jquery call.

	// $("#user-login").on("click", function(event){
	// 	event.preventDefault();
	// 	var user = {
	// 		username: $("#existing-email").val().trim(),
	//  		password: $("#existing-password").val().trim()
	//  	};
	//  	console.log(user)
	// 	$.post("/login/post", user, function(data){
	// 		// if(data==="wrong password"){
	// 		// 	alert("you entered wrong password");
	// 		// }else if(data ==="invalid email"){
	// 		// 	alert("you entered invalid email");
	// 		// };
	// 		// $("#existing-email").val("");
	// 		// $("#existing-password").val("");
	// 	})
	// 	// console.log("this button did something")
	// });


	$("#recover-pw").click(function() {
	    var user ={email:$("#recover-email").val().trim()};
	    $("#confirm").text("Sending E-mail ... Please wait");
	    $.post("/sendemail",user,function(data){
	    	if(data ==="sent"){
	    		$("#confirm").empty().html(
	           		"Thank you. Your Plaudit account password has been emailed to "
	           		+ user.email + "."
	           	);
	    	}else if(data==="invalid email"){
	    		alert("invalid email");
	    	};
	    });
	    $("#recover-email").val("");
	    $("#confirm").text("");
	});

// Adding feedback message to front-end on "sign up" section.
// Great if we can replace USER.EMAIL with NAME -- don't know how to do it.
$("#email-search").on("click", function(event) {
    event.preventDefault();
    var user = { email: $("#newuser-email").val().trim() };
    $.post("/checkemail", user, function(data) {
        if (data === true) {
            $("#replace-name").empty().html("Welcome " + user.email + "! Please complete the sign-up process below.");
        } else if (data === "invalid email") {
            $("#replace-name").empty().html("You are not registered for Plaudit with this email. Please try again.");
        };

    });

});


	$("#newuser-submit").on("click", function(event){
		event.preventDefault();
		var newuser = {
			email: $("#newuser-email").val().trim(),
			password: $("#pw-new").val().trim(),
			favorite: $("#fact").val().trim()
		};
		$.post("/newuser/post", newuser, function(data){
			if (data===true){
				alert("successfully regist, please log in");
			}else if(data === "exist user"){
				alert("you already registed before, please log in")
			}else if(data === "invalid email"){
				alert("invalid email");
			};
			$("#newuser-email").val("");
			$("#pw-new").val("");
			$("#pw-new-valid").val("");
			$("#fact").val("");
		});
	})
});