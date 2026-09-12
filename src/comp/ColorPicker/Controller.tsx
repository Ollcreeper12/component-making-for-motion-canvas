import {Rect, Txt, Icon, RectProps, Layout, LayoutProps} from '@motion-canvas/2d';
import {Color, createRef, createSignal, SimpleSignal} from "@motion-canvas/core";

export interface ObjectProperties extends LayoutProps {
    text: string;
    fillText?: () => string;
    color?: SimpleSignal<Color>;
    fillWidth?: () => number;
}

export class Controller extends Layout {

    // public readonly color = createSignal(new Color('#000000ff'))



    public constructor(props: ObjectProperties) {
        super({
            ...props,
            gap: 10,
            padding: 5,
            layout: true,
            direction: "row",
            alignItems: "center",
        });

        const headerRef = createRef<Rect>()

        // @ts-ignore
        this.add(
            <>


                <Rect
                    ref={headerRef}
                    fill={'#4d4d4d'}
                    //height={50}
                    shadowColor={'#212121'}
                    shadowOffsetY={5}
                    shadowBlur={5}
                    radius={10}
                    alignItems={"center"}
                    //gap={-5}
                    layout
                    direction={"column"}
                >

                    <Txt
                        fontFamily={"JetBrains Mono"}
                        fill={"#ffffff"}
                        scale={0.7}
                    >{props.text}</Txt>
                </Rect>


                <Layout
                    layout
                    direction={"column"}
                    alignItems={"center"}
                >
                    <Rect
                        fill={'#4d4d4d'}
                        width={255}
                        //height={() => headerRef().height()}
                        radius={10}
                        smoothCorners
                        shadowColor={'#212121'}
                        shadowOffsetY={5}
                        shadowBlur={5}
                        layout
                        direction={"column"}
                        //alignItems={"center"}
                        clip
                    >
                        <Rect
                            width={props.fillWidth}
                            height={50}
                            fill={props.color}
                            radius={[0,10,10,10]}
                        />
                        <Layout alignItems={"center"} justifyContent={"center"}>
                            <Txt
                                fontFamily={"JetBrains Mono"}
                                fontSize={20}
                                scale={0.7}
                                fill={'#ffffff'}>{props.fillText as any}</Txt>
                        </Layout>
                    </Rect>

                </Layout>
            </>
        );
    }
}
