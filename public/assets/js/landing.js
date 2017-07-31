$(document).ready(function(){

function updatePassword(email, password){
	console.log("email", email)
	console.log("password", password)	
	var dataObject = {email: email, password : password}
	$.ajax({
	   		method: "PUT",
	   		url: "/api/updatePassword",
	   		// dataType: "JSON",
	   		data: dataObject
	   	})
};

	$("#recover-pw").click(function(event) {
		event.preventDefault();
	    var user ={email:$("#recover-email").val().trim()};
	    $("#confirm").text("Sending E-mail ... Please wait");
	    $.post("/sendemail",user,function(data){
	    	if(data.status ==="sent"){
	    		$("#confirm").empty().html(
	           		"Thank you. Your Plaudit account password has been emailed to "
	           		+ user.email + "."
	           	);
	           	console.log("passwordfirst", data.password);	
	           	updatePassword(user.email, data.password);
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
        }else if(data === "exist user"){
				if(confirm("This account is already registered, please log in.")){
					document.location.href="/";
				};
		}

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
				if(confirm("Successfully registered, please log in.")){
					document.location.href="/";
				}
			}else if(data === "exist user"){
				if(confirm("This account is already registered, please log in.")){
					document.location.href="/";
				};
			}else if(data === "invalid email"){
				alert("Invalid email, please register again.");
			};
			$("#newuser-email").val("");
			$("#pw-new").val("");
			$("#pw-new-valid").val("");
			$("#fact").val("");
	
		});
	})
});
