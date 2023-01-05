/**
 * Base Information
 * Author: Ness
 * License: MIT
 * Source: https://github.com/Soucouyant/keyframe-script
 */

/**
 * Useful Methods
 * Property.keyTime()
 * Property.keyValue()
 * Property.removeKey()
 * Property.addKey()
 */

/**
 * UI Initialization
 */
var window = new Window("palette", "Keyframe Script", undefined);
var initGroup = window.add("group", undefined, "initGroup");
var numLayers = app.project.activeItem.numLayers;
var dropdownArray = [];
var buttonOne = window.add("button", undefined, "Button 1");
var testButton = window.add("button", undefined, "Test Button");

window.orientation = "column";
initGroup.orientation = "row";
for (var i = 0; i < numLayers; i++) {
	dropdownArray.push(app.project.activeItem.layer(i + 1).name);
}
var dropdown = window.add("dropdownlist", undefined, dropdownArray);

dropdown.selection = 0;

/**
 * Work
 */
var concernedLayer = dropdown.selection;
dropdown.onChange = function () {
	concernedLayer = dropdown.selection;
	alert(concernedLayer);
};
// Check if Layer is AV Layer

function checkLayerType() {
	// alert(dropdownArray.indexOf(concernedLayer));
	alert("Hello");
}

buttonOne.onClick = checkLayerType();

/**
 * Tester
 */
testButton.onClick = function () {
	// Doesn't Work
	app.project.activeItem.layer(1).effect("Time Remap").addKey(2);
	alert("Test");
};

window.center();
window.show();
