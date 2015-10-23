/*
 * File: /~sparedes/WEB-INF/js/multiplication.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * updated by SCP on October 12, 2015 at 07:42 PM
 * updated by SCP on October 13, 2015 at 12:34 PM
 * updated by SCP on October 15, 2015 at 06:29 AM
 * updated by SCP on October 22, 2015 at 12:31 AM
 * updated by SCP on October 23, 2015 at 11:50 AM
 */

// createTable() builds and inserts a multiplication table into an html page through the multTable id.
function createTable() {
	firstMultiplier = parseInt(document.getElementById('firstMultiplier').value);
	secondMultiplier = parseInt(document.getElementById('secondMultiplier').value);
	firstMultiplicand = parseInt(document.getElementById('firstMultiplicand').value);
	secondMultiplicand = parseInt(document.getElementById('secondMultiplicand').value);
	// this one-liner collects the parameters in the url and creates a dictionary of the parameters
	// // var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

	// organize the multipliers and multiplicands and distribute them to the max and min table values
	var multipliers = [firstMultiplier, secondMultiplier].sort();
	var minHorizontal = multipliers[0];
	var maxHorizontal = multipliers[1];
	var multiplicands = [firstMultiplicand, secondMultiplicand].sort();
	var minVertical = multiplicands[0];
	var maxVertical = multiplicands[1];

	var difference = function (a, b) { return Math.abs(a - b) }

	// set the dimensions of the table, accounting for blank cells and inclusive range (+2)
	verticalDimension = difference(minVertical, maxVertical) + 2;
	horizontalDimension = difference(minHorizontal, maxHorizontal) + 2;

	// intialize a two-dimensional array that will contain the values of the multiplication table
	var multArray = new Array(verticalDimension + 1);
	for (var i = 0; i < verticalDimension + 1; i++) {
	 	multArray[i] = new Array(horizontalDimension + 1);
	}

	// insert the table axes values into the multiplication array
	for (var i = 0; i < horizontalDimension; i++) {
		multArray[0][i+1] = minHorizontal + i;
	}
	for (var i = 0; i < verticalDimension; i++) {
		multArray[i+1][0] = minVertical + i;
	}

	// ensure that the blank cell is blank and !undefined
	multArray[0][0] = "";
	for (var i = 1; i < verticalDimension; i++) {
		for (var j = 1; j < horizontalDimension; j++) {
			multArray[i][j] = multArray[i][0] * multArray[0][j];
		}
	}

	// build the table, concatenating multiplication array values into each row and column of the table
	var tableContents = "";
	for (var i = 0; i < verticalDimension; i++) {
		tableContents += "<tr>";
		for (var j = 0; j < horizontalDimension; j++) {
			tableContents += "<td>" + multArray[i][j] + "</td>";
		}
		tableContents += "</tr>";
	}
	tableContents += "</table>";

	// sets the html content targeted by the multTable id to the tableContents developed above
	document.getElementById('multTable').innerHTML = tableContents;
}


