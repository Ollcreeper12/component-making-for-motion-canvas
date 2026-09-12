import {Circle, makeScene2D} from '@motion-canvas/2d';
import {createRef} from '@motion-canvas/core';
import {ColorPicker} from "../comp/ColorPicker";

export default makeScene2D(function* (view) {



    view.add(
        <ColorPicker
            ref={}
        />
    )

});
