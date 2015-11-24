/*
 * File: /~sparedes/WEB-INF/js/tabs.js
 * Santiago C. Paredes, UMass Lowell Computer Science, sparedes@cs.uml.edu
 * updated by SCP on November 18, 2015 at 17:35 PM
 * updated by SCP on November 19, 2015 at 07:36 AM
 * updated by SCP on November 24, 2015 at 09:02 AM
 *
 * This is uses some functions and features from js/multiplication.js, and essentially is able to take
 * a set of input and calculate, build, and structure a multiplication table within a tab.
 */

$(document).ready(function () {

    // if the user clicls the submit button and the form is valid, then build the table and prevent
    // a page refresh
    $(".submit").click(function(e){
      if($("form").valid()){
        createTable();
        e.preventDefault();
      }
    });

    // the initial table is created so that the user can see what a tab/table looks like before they
    // even enter an input
    function createInitialTable () {
      var data = {'firstMultiplier': -3, 'secondMultiplier': 4, 'firstMultiplicand': -2, 'secondMultiplicand': 1};
      createTable(data, 1);
    }
    function createTable(data) {

      firstMultiplier = parseInt(document.getElementById('firstMultiplier').value);
      secondMultiplier = parseInt(document.getElementById('secondMultiplier').value);
      firstMultiplicand = parseInt(document.getElementById('firstMultiplicand').value);
      secondMultiplicand = parseInt(document.getElementById('secondMultiplicand').value);
      
      if (data) {
        firstMultiplier = data['firstMultiplier'];
        secondMultiplier = data['secondMultiplier'];
        firstMultiplicand = data['firstMultiplicand'];
        secondMultiplicand = data['secondMultiplicand'];
      }

      // this one-liner collects the parameters in the url and creates a dictionary of the parameters
      // // var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

      // organize the multipliers and multiplicands and distribute them to the max and min table values
      var multipliers = [firstMultiplier, secondMultiplier].sort(function(a,b){return a - b});
      var minHorizontal = multipliers[0];
      var maxHorizontal = multipliers[1];
      var multiplicands = [firstMultiplicand, secondMultiplicand].sort(function(a,b){return a - b});
      var minVertical = multiplicands[0];
      var maxVertical = multiplicands[1];

      var difference = function (a, b) { return Math.abs(a - b) }

      // set the dimensions of the table, accounting for blank cells and inclusive range (+2)
      // console.log(minVertical, maxVertical);
      // console.log(difference(minVertical, maxVertical));
      // console.log(minHorizontal, maxHorizontal);
      // console.log(difference(minHorizontal, maxHorizontal));
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

      // // sets the html content targeted by the multTable id to the tableContents developed above
      // document.getElementById('multTable-'+tabNumber).innerHTML = tableContents;

      addTab(multipliers, multiplicands, tableContents);
    }   

    // give the tabs context
    var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 1;
 
    var tabs = $( "#tabs" ).tabs();
 
    // custom buttons and a "close" callback resetting the form inside
    var dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // adds new tab using the input from the form in assignment8.html
    function addTab(multipliers, multiplicands, tableContents) {
      var label = tabTitle.val() || "Parameters(" + multipliers[0] + "," + multipliers[1] + "," + multiplicands[0] + "," + multiplicands[1] + ")",
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tableContents;

      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div class='col-lg-10 table-centered' id='" + id + "'>" + "<table class='table table-striped table-bordered'>" + tabContentHtml + "</table></div>");
      tabs.tabs( "refresh" );
      tabCounter++;

      addCheckbox(id);
    }
 
    // adds new checkbox and label for each tab created
    function addCheckbox(name) {
       var container = $('#check');
       var inputs = container.find('input');
       var id = inputs.length+1;

       $('<input />', { type: 'checkbox', id: 'cb'+id, value: name }).appendTo(container);
       $('<label />', { 'for': 'cb'+id}).text(name).appendTo(container);
    }

    // this is where the call to create the intial tab that the user sees actually happens
    createInitialTable();
 
    // removes the tab when the close icon is clicked
    tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      var id = panelId.replace('tabs-', '');
      $('label[for=cb' + id + ']').remove();
      $('input[id=cb' + id + ']').remove();
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.bind( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
    
    // removes all the tabs and their respective panels and checkboxes/labes
    $("#remove_tabs").click(function(e){
      $(".ui-tabs-nav li").remove();
      $(".ui-tabs-panel").remove();
      $(".checkbox label").remove();
      $(".checkbox input").remove();
    });

    // removes selected tabs and their respective panels and checkboxes/labes
    $("#selected_tabs").click(function(e) {
      $('input[type=checkbox]:checked').each(function(idx, item){
        var id = item.id.replace('cb', '');
        $(".ui-tabs-nav li[aria-labelledby=ui-id-" + id + "]").remove();
        $(".ui-tabs-panel[id=tabs-" + id + "]").remove();
        $(item).next().remove();
        item.remove();
      });
    });

  // reference for sliders: https://jqueryui.com/slider/#rangemin
  $("#slider1").slider({
      range: "max",
      min: -9,
      max: 9,
      value: parseInt($('input[name=firstMultiplier]').val()) || 0,
      stop: function (e, ui) {
          $("#firstMultiplier").val(ui.value);
          $("form").validate();
      }
  });

  $("#slider2").slider({
      range: "max",
      min: -9,
      max: 9,
      value: parseInt($('input[name=secondMultiplier]').val()) || 0,
      stop: function (e, ui) {
          $("#secondMultiplier").val(ui.value);
          $("form").validate();
      }
  });

  $("#slider3").slider({
      range: "max",
      min: -9,
      max: 9,
      value: parseInt($('input[name=firstMultiplicand]').val()) || 0,
      stop: function (e, ui) {
          $("#firstMultiplicand").val(ui.value);
          $("form").validate();
      }
  });

  $("#slider4").slider({
      range: "max",
      min: -9,
      max: 9,
      value: parseInt($('input[name=secondMultiplicand]').val()) || 0,
      stop: function (e, ui) {
          $("#secondMultiplicand").val(ui.value);
          $("form").validate();
      }
  });

});