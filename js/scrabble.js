/*
 * File: /~sparedes/WEB-INF/js/scrabble.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * updated by SCP on December 7, 2015 at 07:42 PM
 *
 * This is an extremely simple implementation of a jQuery validator behavior.  Clean and functional -- I love it. 
 */

var random_letters = ""; // stores the randomly generated letter list
var count_tiles = 0; // counts how many tiles have been distributed
var score = 0;  // keeps track of the score

// Deals the first hand of tiles on pageload
$(document).ready(
    function () {
        generateTiles();
});

// drag and drop is intialized (enables drag and drop)
$(document).ready(
    function () {
        DragAndDrop();
});

// scrabble tile data structure taken from Jesse Heines
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

// identifies which letter is dropped onto which square and updates score accordingly
function DragAndDrop() {
    $(".draggable").draggable({
        revert: 'invalid',
        snap: ".droppable",
        snapMode: "inner"
    });
    $(".droppable").droppable({
        // accept: ".draggable",
        drop: function (event, ui) {

            // center snapping was referenced:
            /* http://stackoverflow.com/questions/26746823/jquery-ui-drag-and-drop-snap-to-center nevers */
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }});

            // give calculateScore the current letter we dropped
            calculateScore($(ui.draggable).children("img").attr("alt"), $(this).children("img").attr("alt"));

            $(this).droppable('option', 'accept', ui.draggable);
            console.log("there");
        },
        out: function (event, ui) {
            if (prevent_unscore == true) {
                return;
            } else {
            $(this).droppable('option', 'accept', '.draggable');
            console.log("score should update once but as you can see here it will attempt multiple times");
            // a score update would presumably occur here, but unfortunately out is called 
            // every time a dropped tile drags accross another tile. 
           }
        }

    });
};

// calculate player's score upon placement of a new tile
function calculateScore(tile, square) {

    var letterscore = 0;
	letterscore = ScrabbleTiles[tile]["value"];

    if (square === "doubleletter")
        letterscore = letterscore * 2;

    score += letterscore;

    if (square === "tripleword")
        score = score * 3;

    $("#score").html("<p class='center'>Score: " + score + "<p>");
};

// A potentially better scoring function in progress
// function calculateScore() {
//     var score = 0;
//     for (var item in $('#scrabble_board').children()) {
//         letter = item.children[0].alt
//     }
//     $('#scrabble_board').children()[0].children[0].alt
// }

// genereates the user's hand upon a page refresh
function generateTiles() {

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    var letter = "";

    // http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    for (var i = 0; i < 7; i++)
        random_letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    // generate tiles using the random_letters from above
    for (var j = 0; j < 7; j++) {
        count_tiles += 1;
        letter = random_letters.charAt(j);
        var str_rack = ("<div class='draggable block'>"
            + "<img src='img/scrabble-tiles/Scrabble_Tile_"
            + (letter == "_" ? "Blank" : letter) // use 'Blank' when '_' is the letter 
            + ".jpg' width=50 height=50 alt='"
            + letter
            + "'>"
            + "</div>");
        ScrabbleTiles[letter]["number-remaining"] -= 1; // availablility of tiles is recalculated
        $("#rack").append(str_rack)
    }
};