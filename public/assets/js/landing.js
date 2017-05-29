$(document).ready(function(){

	// Materialize modal open/close
	$('.modal').modal();
	
	// Greensock intro animation
	var tl = new TimelineLite, 
	mySplitText = new SplitText("#intro-text", {type:"words,chars"}), 
	words = mySplitText.words; //an array of all the divs that wrap each character
	
	TweenLite.set("#intro-text", {perspective:400});
	tl.staggerFrom(words, 1.5, {opacity:0, scale:3, x:20, rotationX:50, transformOrigin:"0% 100% 300",  ease:Back.easeOut}, 0.1, "+=0")
	.to("#intro-text", .8, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=1")
	.to("#intro-text", .8, {display: "none", scale:1.75, ease:Back.easeOut}, "-=.75")
	.from("#sign-in", .6, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=0");
	
	//ONE PAGE SMOOTH SCROLL//
	
	// Select all links with hashes
	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	
	.click(function(event) {
	// On-page links
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		&& 
		location.hostname == this.hostname
		) {
		// Figure out element to scroll to
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		// Does a scroll target exist?
			if (target.length) {
		 	// Only prevent default if animation is actually going to happen
		        event.preventDefault();
		        $('html, body').animate({
		        scrollTop: target.offset().top
		        }, 1000, function() {
		            // Callback after animation
		            // Must change focus!
		            var $target = $(target);
		            $target.focus();
		            if ($target.is(":focus")) { // Checking if the target was focused
		                res.json(true);
		            } else {
		                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		                $target.focus(); // Set focus again
		            };
		        });
		    };
		};
	});

	$("#user-login").on("click", function(event){
		event.preventDefault();
		var user = {
			email: $("#existing-email").val().trim(),
			password: $("#existing-password").val().trim()
		};
		$.post("/login/post", user, function(data){
			if(data==="wrong password"){
				alert("you entered wrong password");
			}else if(data ==="invalid email"){
				alert("you entered invalid email");
			};
			$("#existing-email").val("");
			$("#existing-password").val("");
		})
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
				console.log(data);
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