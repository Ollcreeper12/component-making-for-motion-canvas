import {Rect, Txt, Icon, RectProps, Layout, LayoutProps} from '@motion-canvas/2d';
import {Color, createRef, createSignal} from "@motion-canvas/core";
import {Label} from "@motion-canvas/ui";
import {Controller} from './ColorPicker/Controller';

export interface ObjectProperties extends LayoutProps {
}

export class ColorPicker extends Layout {

    public readonly color = createSignal(new Color('#000000'))
    public readonly previewHeight = createSignal(150)
    public readonly radius = createSignal(10)



    // public readonly green
    // public readonly  blue

    private getRGB() {
        const colorHex: string = this.color().hex("rgba")

        return {
            r: parseInt(colorHex.slice(1, 3), 16),
            g: parseInt(colorHex.slice(3, 5), 16),
            b: parseInt(colorHex.slice(5, 7), 16),
            a: parseInt(colorHex.slice(7, 9), 16),
        }
    }

    public constructor(props: ObjectProperties) {
        super({
            ...props,
            layout: true,
            alignItems: 'center',
            direction: 'column',
        });

        const rgba = createRef<Controller>();

        // The Preview
        this.add(
            <>
                <Rect
                    fill={() => this.color()}
                    // width={() => rgba().width()}
                    height={() => this.previewHeight()}
                    radius={() => [
                        this.radius(),
                        this.radius(),
                        0,
                        0
                    ]}
                    alignItems={"center"}
                    padding={10}
                    smoothCorners
                >
                    <Controller text={"A:"} scale={0}/>
                </Rect>




        // The RGBA


                <Rect

                    layout
                    direction={'column'}
                    alignItems={'center'}
                    padding={10}
                    gap={0}
                    fill={'#282828'}
                    radius={() => [
                        0,
                        0,
                        this.radius(),
                        this.radius()
                    ]}

                    shadowColor={'#212121'}
                    shadowOffsetY={5}
                    shadowBlur={5}

                    smoothCorners
                >
                    <Controller
                        text={"R:"}
                        color={this.color}
                        fillWidth={() => this.getRGB().r}
                        fillText={() => this.getRGB().r.toString()}/>
                    <Controller
                        text={"G:"}
                        color={this.color}
                        fillWidth={() => this.getRGB().g}
                        fillText={() => this.getRGB().g.toString()}/>
                    <Controller
                        text={"B:"}
                        color={this.color}
                        fillWidth={() => this.getRGB().b}
                        fillText={() => this.getRGB().b.toString()}/>
                    <Controller
                        text={"A:"}
                        color={this.color}
                        fillWidth={() => this.getRGB().a}
                        fillText={() => this.getRGB().a.toString()}
                    />
                </Rect>
            </>
        );


    }
}
