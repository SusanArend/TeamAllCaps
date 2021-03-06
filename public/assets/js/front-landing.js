$(document).ready(function(){

	// hide new user sign in until sign-up link is clicked
	$('#newuser-page').hide();

	// click events to toggle sign-in and new user forms using GreenSock
	$('#sign-up-link').on('click',function(event){
		
		TweenLite.to("#newuser-page", .6, {display: 'block', ease:Back.easeOut}, "+=0");
		TweenLite.from("#newuser-page", .6, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=0");
		$('#sign-in').hide();

	})
	$('#sign-in-link').on('click',function(event){

		TweenLite.to("#sign-in", .6, {display: 'block', ease:Back.easeOut}, "+=0");
		TweenLite.from("#sign-in", .6, {opacity: 0, scale:1.5, ease:Back.easeOut}, "+=0");
		$('#newuser-page').hide();
	})

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

		// GreenSock intro animation
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

  	// If there is a login error, do not show/play the animation
	}else{

		$('#intro-text').hide();
	}
});