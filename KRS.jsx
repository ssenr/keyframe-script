/**
 *  After Effects Keyframe Rearrangment Script: KRS
 *  Author: ness/ssenr
 *  License: MIT
 *  Source: https://github.com/ssenr/keyframe-script
 */

function KRS(thisObj) {
	/*
	 *  Build UI
	 */
	function buildUI(thisObj) {
		var isPanel = thisObj instanceof Panel;
		var mainWindow = isPanel
			? thisObj
			: new Window("palette", undefined, undefined, {
					resizable: true,
			  });

		uiElements =
			"group{orientation:'column',\
        groupZero: Group{orientation:'column', name: StaticText{text: 'KRS v1.0'}},\
        groupTwo: Group{orientation:'row', layerList: DropDownList{}},\
        groupOne: Group{orientation:'row', rearrangeKeyframes: Button{text: 'Append Keyframes'}, refreshList: Button{text: 'Refresh Layer List'}},\
        groupThree: Group{orientation:'column', credits: StaticText{text: 'github.com/ssenr'}},\
        }";

		/**
		 * UI Properties
		 */
		mainWindow.grp = mainWindow.add(uiElements);

		// Panel/Window Setup
		mainWindow.grp.groupTwo.layerList.size = [175, 10];
		mainWindow.layout.layout(true);
		mainWindow.grp.minimumSize = mainWindow.grp.size;
		mainWindow.layout.resize();

		// Initialize Dropdown List
		var lengthOfList = mainWindow.grp.groupTwo.layerList.length;
		if (lengthOfList > 0) {
			for (var i = 0; i < lengthOfList; i++) {
				mainWindow.grp.groupTwo.layerList.remove(
					mainWindow.grp.groupTwo.layerList.items[0]
				);
			}
		}

		// Populate List
		var numLayers = app.project.activeItem.numLayers;
		for (var i = 0; i < numLayers; i++) {
			mainWindow.grp.groupTwo.layerList.add(
				"item",
				app.project.activeItem.layer(i + 1).name
			);
		}

		/**
		 * UI Events
		 */
		mainWindow.onResizing = mainWindow.onResize = function () {
			this.layout.resize();
		};

		mainWindow.grp.groupOne.refreshList.onClick = function () {
			var lengthOfList = mainWindow.grp.groupTwo.layerList.length;
			if (lengthOfList > 0) {
				for (var i = 0; i < lengthOfList; i++) {
					mainWindow.grp.groupTwo.layerList.remove(
						mainWindow.grp.groupTwo.layerList.items[0]
					);
				}
			}

			// Populate List
			var numLayers = app.project.activeItem.numLayers;
			for (var i = 0; i < numLayers; i++) {
				mainWindow.grp.groupTwo.layerList.add(
					app.project.activeItem.layer(i + 1).name
				);
			}
		};

		mainWindow.grp.groupOne.rearrangeKeyframes.onClick = function () {};
		// Return
		return mainWindow;
	}

	/**
	 * Util Functions
	 */

	function populateLayerList() {
		// Clear List
		var lengthOfList = mainWindow.grp.groupTwo.layerList.length;
		if (lengthOfList > 0) {
			for (var i = 0; i < lengthOfList; i++) {
				mainWindow.grp.groupTwo.layerList.remove(
					mainWindow.grp.groupTwo.layerList.items[0]
				);
			}
		}

		// Populate List
		var numLayers = app.project.activeItem.numLayers;
		for (var i = 0; i < numLayers; i++) {
			mainWindow.grp.groupTwo.layerList.add(
				app.project.activeItem.layer(i + 1).name
			);
		}
	}

	function getKeyframes() {
		/**
		 * AV Layer Handling
		 * Check Precomp Time Remap Property
		 */
		var layer = app.project.activeItem.selectedLayers.timeRemapEnabled;

		// AV Layer
		// Check if timeRemap is enabled
		return alert(layer);
	}

	function appendKeyframes() {
		return undefined;
	}

	/**
	 * Script Handler
	 */
	var script = buildUI(thisObj);

	if (script != null && script instanceof Window) {
		script.center();
		script.show();
	}
}

// Invoke
KRS(this);
