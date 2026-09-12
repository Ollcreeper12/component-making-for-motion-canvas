import {Circle, makeScene2D} from '@motion-canvas/2d';
import {Color, createRef, easeInCubic, easeOutCubic, waitUntil} from '@motion-canvas/core';
import {ColorPicker} from "../comp/ColorPicker";

export default makeScene2D(function* (view) {

    const picker = createRef<ColorPicker>()

    view.add(
        <ColorPicker
            ref={picker}
        />
    )

    picker().color(new Color('#fc4141'))


    yield* picker().color(new Color('#7f41fc'),1, easeInCubic)
    yield* picker().color(new Color('#4673e8'),1, easeOutCubic)

    yield* waitUntil("end")

});
