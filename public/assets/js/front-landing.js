$(document).ready(function(){

	// Materialize modal open/close
	$('.modal').modal();


	// The remaining code is for the Plaudit intro animation. 
	// Note: Passport essentially refreshes page through a redirect upon incorrect password input,
	// so using if/else statement to prevent animation from replaying.
	// ------------------------------------------------------------

	//function to determine if element is empty
	function isEmpty( el ){
      return !$.trim(el.html())
  	}
  
  	//passing the login error div through the function. 
  	// If no login errors displayed on page, okay to play intro animation
  	if (isEmpty($('#login-error'))) {

		// Greensock intro animation
		var tl = new TimelineLite, 
		plodetSplitText = new SplitText("#plodet", {type:"words,chars"}), 
		words1 = plodetSplitText.chars;
		definitionSplitText = new SplitText("#definition", {type:"words,chars"}), 
		words2 = definitionSplitText.words; //an array of all the divs that wrap each character
		
		TweenLite.set(["#plodet","#definition"], {perspective:400});
		tl.staggerFrom(words1, 1.5, {opacity:0, scale:3, x:20, rotationX:50, transformOrigin:"0% 100% 300",  ease:Back.easeOut}, 0.1, "+=0")
		.staggerFrom(words2, 1.5, {opacity:0, scale:3, x:20, rotationX:50, transformOrigin:"0% 100% 300",  ease:Back.easeOut}, 0.1, "-=1.5")
		.to(["#plodet", "#definition"], .8, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=1")
		.to(["#plodet", "#definition"], .8, {display: "none", scale:1.75, ease:Back.easeOut}, "-=.75")
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
			                // res.json(true);
			            } else {
			                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
			                $target.focus(); // Set focus again
			            };
			        });
			    };
			};
		});

  	// If there is a login error, do not show/play the animation
	}else{

		$('#intro-text').hide();
	}
});