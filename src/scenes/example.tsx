import {makeScene2D} from '@motion-canvas/2d';
import {createRef, waitUntil} from '@motion-canvas/core';
import {Object} from "../comp/Object";

export default makeScene2D(function* (view) {

    const obj = createRef<Object>();

    view.add(
        <>
            <Object
                ref={obj}
                text={"Misty"}
                y={-50}
                fontFamily={"JetBrains Mono"}
            />
        </>
    )

    yield* obj().animateFromFlat(1)
    yield* obj().textLegacyAnimate("dfkgfjbdfjghbdfjghbdfgjhbdfgjdfhgbdf", 1)

    yield* obj().animateToFlat(1)


    yield* waitUntil("end")

});
