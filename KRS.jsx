/*
 *  After Effects Keyframe Rearrangement Script: KRS
 *  Author: ness/ssenr
 *  License: MIT
 */

function KRS(thisObj) {
    /*
     *  Build UI
     */
    function buildUI(thisObj) {
        var isPanel = thisObj instanceof Panel;
        var mainWindow = isPanel ? thisObj : new Window(
            "palette",
            undefined,
            undefined,
            {
                resizable: true
            }
        )

        uiElements = "group{orientation:'column',\
        groupOne: Group{orientation:'row',\
            rearrangeKeyframes: Button{text: 'Append Keyframes'},\
        },\
        }";

        mainWindow.grp = mainWindow.add(uiElements)
        
        mainWindow.layout.layout(true);
        return mainWindow;
    }
    var script = buildUI(thisObj);
    
    if (script != null && script instanceof Window) {
        script.center();
        script.show()
    }   
}

// Invoke
KRS(this)
