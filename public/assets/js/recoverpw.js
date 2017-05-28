$(document).ready(function(){

	// Password recovery script
	$("#recover-pw").click(function() {
	    var address = $("#recover-email").val();
	    $("#confirm").text("Sending E-mail ... Please wait");
	    
	    $.get("http://localhost:8080/send", {
	        address: address
	    }, function(data) {
	        if (data == "sent") {
	            $("#confirm").empty().html(
	           		"Thank you. Your Plaudit account password has been emailed to "
	           		+ address + "."
	           	);
	        };
	    });
	});
});