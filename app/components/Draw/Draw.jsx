import React from 'react';
import DrawingArea from '../DrawingArea/DrawingArea';
import Toolbar from '../Toolbar/Toolbar';
import firebase from 'firebase';
import './Draw.scss';

const drawingTools = ["brush", "bucket", "eraser"];
const brushThickness = ["thick", "medium", "thin"];
const colors = ['FAFF00', 'F88E00', 'F75800', 'F62600', 'C00000', 'BC005B', '54005A', '0B005D', '0A2496',
    '135B58', '359000', '5FCA00'];
const storage = firebase.storage();
const storageRef = storage.ref();

/**
 * Draw class.
 * @class Draw
 * @augments React.Component
 */
const Draw = React.createClass(/** @lends Draw.prototype */{

    /**
     * @property {String} displayName - A string used in debugging messages.
     */
    displayName: 'Draw',

    /**
     * @property {Object} propTypes - An object used to validate props being passed into the components
     */
    propTypes: {
        children: React.PropTypes.string,
        description: React.PropTypes.string,
        goToThankYouPage: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            description: 'Three cows eating grass in France.'
        }
    },

    getInitialState() {
        return {
            selectedTool: 'paintbrush',
            selectedThickness: 'medium',
            selectedColor: 'black',
            needsToBeCleared: false,
            needsToBeSaved: false
        }
    },

    onToolSelected(toolName) {
        this.setState({'selectedTool': toolName});
    },

    onColorSelected(colorName) {
        const colorCode = '#' + colorName;
        this.setState({'selectedColor': colorCode});
    },

    //TODO: This switch is not needed. Instead of strings, pass thickness
    //values and have those returned directly.
    onThicknessSelected(thickness) {
        let pixelThickness;

        switch (thickness) {
            case 'thick':
                pixelThickness = 40;
                break;
            case 'medium':
                pixelThickness = 30;
                break;
            case 'thin':
                pixelThickness = 20;
                break;
            default:
                pixelThickness = 30;
        }

        this.setState({'selectedThickness': pixelThickness});
    },

    onClearCanvas() {
        //don't forget to prompt the user about this choice
        this.clearCanvas();
    },

    clearCanvas() {
        this.setState({'needsToBeCleared': true});
    },

    onCanvasCleared() {
        this.setState({'needsToBeCleared': false});
    },

    onCompleteDrawing() {
        this.setState({'needsToBeSaved': true})
    },

    onDrawingCompleted(drawing) {
        this.setState({'needsToBeSaved': false});
        this.saveDrawingToStorage(drawing);
        //TODO: Should these steps be part of the success method
        //of the saveDrawingToStorage method?
        //There are big scope issues involved it would seem.
        this.saveDrawingNameToDB(drawing.name);
        this.props.goToThankYouPage();
        //go to Thank You Step.
    },

    saveDrawingToStorage(drawing) {

        //save drawing to db
        let drawingAsBlob = this.dataURItoBlob(drawing.src);
        let uploadTask = storageRef.child(drawing.name).put(drawingAsBlob);

        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
        }, function (error) {
            // Handle unsuccessful uploads
            console.log(error);
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            //TODO: Pass the downloadURL to the db as part of this round's data
            let downloadURL = uploadTask.snapshot.downloadURL;
        });

    },


    saveDrawingNameToDB(fileName) {
        console.log('Figure this out already!');
    },

    dataURItoBlob(data_uri) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        const byteString = atob(data_uri.split(',')[1]);

        // separate out the mime component
        const mimeString = data_uri.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {type: mimeString});
    },

    /**
     * Renders the component based on the properties passed in from a parent
     * component and the component's state.
     * @method render
     * @return {ReactElement}
     */
    render() {
        return (
            <div className="draw">
                <Toolbar toolType="drawing" toolbarName="drawing_tools" toolSelectionHandler={this.onToolSelected}
                         toolButtons={drawingTools}/>
                <Toolbar toolType="brushThickness" toolbarName="brush_thickness"
                         toolSelectionHandler={this.onThicknessSelected} toolButtons={brushThickness}/>
                <DrawingArea clearNow={this.state.needsToBeCleared} onCleared={this.onCanvasCleared}
                             saveNow={this.state.needsToBeSaved} onSaved={this.onDrawingCompleted}
                             brushWidth={this.state.selectedThickness} selectedColor={this.state.selectedColor}/>
                <Toolbar toolType="colorPalette" toolbarName="color_palette" toolSelectionHandler={this.onColorSelected}
                         toolButtons={colors}/>
                <div className="description-container">
                    <p className="description">{this.props.description}</p>
                    <div className="button clear-all" onClick={this.onClearCanvas}>Clear All</div>
                    <div className="button submit-picture" onClick={this.onCompleteDrawing}>OK</div>
                </div>
            </div>
        );
    }
});

export default Draw;
