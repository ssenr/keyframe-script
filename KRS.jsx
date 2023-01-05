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
		var dropdownArray = [];
		function populateList() {
			var lengthOfList = mainWindow.grp.groupTwo.layerList.items.length;
			if (lengthOfList > 0) {
				for (var i = 0; i < lengthOfList; i++) {
					dropdownArray = [];
					mainWindow.grp.groupTwo.layerList.remove(
						mainWindow.grp.groupTwo.layerList.items[0]
					);
				}
			}

			// Populate List
			var numLayers = app.project.activeItem.numLayers;
			for (var i = 0; i < numLayers; i++) {
				dropdownArray.push(app.project.activeItem.layer(i + 1).name);
				mainWindow.grp.groupTwo.layerList.add(
					"item",
					app.project.activeItem.layer(i + 1).name
				);
			}
			mainWindow.grp.groupTwo.layerList.selection = 0;
		}
		populateList();

		/**
		 * UI Events
		 */
		mainWindow.onResizing = mainWindow.onResize = function () {
			this.layout.resize();
		};

		mainWindow.grp.groupOne.refreshList.onClick = function () {
			populateList();
		};

		mainWindow.grp.groupOne.rearrangeKeyframes.onClick = function () {
			// Get Keyrames for Time Remap
			// app.project.item(index).layer(index).propertySpec.selectedKeys
			var selectedLayer = mainWindow.grp.groupTwo.layerList.selection;
			var indice = 0;

			dropdownArray.forEach(checker);

			function checker(value, index, array) {
				if (value == selectedLayer) {
					indice = index;
				}
			}

			alert(indice);
		};

		// Return
		return mainWindow;
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
