import {makeScene2D} from '@motion-canvas/2d';
import {createRef, waitUntil} from '@motion-canvas/core';
import {Object} from "../comp/Object";

export default makeScene2D(function* (view) {

    // const picker = createRef<ColorPicker>()
    const obj = createRef<Object>();
    const obj1 = createRef<Object>();

    view.add(
        <>
            <Object
                ref={obj}
                text={"Misty"}
                y={-50}
                icon={"mdi:cat"}
                fontFamily={"JetBrains Mono"}
            />
            <Object
                ref={obj1}
                text={"Bincy"}
                icon={"mdi:cat"}
                fontFamily={"JetBrains Mono"}
                y={50}
            />
        </>
    )

    yield obj().text("Bincy", 5)
    yield* obj1().textLegacy("Misty", 5)

    yield* waitUntil("end")

});
