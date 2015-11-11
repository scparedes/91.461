/*
 * File: /~sparedes/WEB-INF/js/mult-verification-jquery.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * updated by SCP on November 2, 2015 at 07:42 PM
 *
 * This is an extremely simple implementation of a jQuery validator behavior.  Clean and functional -- I love it. 
 */

$(document).ready(function () {
	$('#multForm').validate({
		// set focus on the first invalid input
		focusInvalid: true,
        // by default the error elements is a <label>
        errorElement: "div",
	 	rules: {
	 		firstMultiplier: {
	 			required: true,
				number: true,
				range: [-9, 9]
	 		},
	  		secondMultiplier: {
	 			required: true,
				number: true,
				range: [-9, 9]
	 		},
	  		firstMultiplicand: {
	 			required: true,
				number: true,
				range: [-9, 9]
	 		},
	  		secondMultiplicand: {
	 			required: true,
				number: true,
				range: [-9, 9]
	 		}
	 	}, // end rules
	 	messages: {
	 		firstMultiplier: {
	 			required: "Please supply a 1-digit integer here.",
	 			number: "You have not entered a number.  Please supply a 1-digit integer.",
	 			range: "You have entered a number outside the \xB1 9 range.  Please supply a number between -9 and 9."
	 		},
	 		secondMultiplier: {
	 			required: "Please supply a 1-digit integer here.",
	 			number: "You have not entered a number.  Please supply a 1-digit integer.",
	 			range: "You have entered a number outside the \xB1 9 range.  Please supply a number between -9 and 9."
	 		},
	 		firstMultiplicand: {
	 			required: "Please supply a 1-digit integer here.",
	 			number: "You have not entered a number.  Please supply a 1-digit integer.",
	 			range: "You have entered a number outside the \xB1 9 range.  Please supply a number between -9 and 9."
	 		},
	 		secondMultiplicand: {
	 			required: "Please supply a 1-digit integer here.",
	 			number: "You have not entered a number.  Please supply a 1-digit integer.",
	 			range: "You have entered a number outside the \xB1 9 range.  Please supply a number between -9 and 9."
	 		}
	 	}, // end messages
	}); // end validate()
});