/*
 * File: /~sparedes/WEB-INF/js/multiplication.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * 
 */

 // http://formvalidation.io/examples/changing-success-error-colors/ 

function validate() {

function validate() {
	firstMultiplier = parseInt(document.getElementById('firstMultiplier').value);
	secondMultiplier = parseInt(document.getElementById('secondMultiplier').value);
	firstMultiplicand = parseInt(document.getElementById('firstMultiplicand').value);
	secondMultiplicand = parseInt(document.getElementById('secondMultiplicand').value);
	// var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});
	

	console.log(firstMultiplier, secondMultiplier, firstMultiplicand, secondMultiplicand);
// }


// 	$(document).ready(function() {
// 	    $('#multForm').formValidation({
// 	        framework: 'bootstrap',
// 	        icon: {
// 	            valid: 'glyphicon glyphicon-ok',
// 	            invalid: 'glyphicon glyphicon-remove',
// 	            validating: 'glyphicon glyphicon-refresh'
// 	        },
// 	        fields: {
// 	            firstMultiplier: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The 1st multiplier is required'
// 	                    },
// 	                    regexp: {
// 	                        regexp: /^[-+]?\d+$/,
// 	                        message: 'The 1st multiplier can only consist of integral values'
// 	                    }
// 	                }
// 	            },
// 	            secondMultiplier: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The 2nd multiplier is required'
// 	                    },
// 	                    regexp: {
// 	                        regexp: /^[-+]?\d+$/,
// 	                        message: 'The 2nd multiplier can only consist of integral values'
// 	                    }
// 	                }
// 	            },
// 	            firstMultiplicand: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The 1st multiplicand is required'
// 	                    },
// 	                    regexp: {
// 	                        regexp: /^[-+]?\d+$/,
// 	                        message: 'The 1st multiplicand can only consist of integral values'
// 	                    }
// 	                }
// 	            },
// 	            secondMultiplicand: {
// 	                validators: {
// 	                    notEmpty: {
// 	                        message: 'The 2nd multiplicand is required'
// 	                    },
// 	                    regexp: {
// 	                        regexp: /^[-+]?\d+$/,
// 	                        message: 'The 2nd multiplicand can only consist of integral values'
// 	                    }
// 	                }
// 	            }
// 	        }
// 	    });
// 	});
// }

function insertTable() {
	document.getElementById('multTable').innerHTML = "Pointless Action";
}