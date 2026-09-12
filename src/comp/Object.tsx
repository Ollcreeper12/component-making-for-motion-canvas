import {Icon, Rect, RectProps, Txt} from '@motion-canvas/2d';
import {createRef, createSignal, easeInOutCubic, SignalValue, SimpleSignal, TimingFunction} from "@motion-canvas/core";

export interface ObjectProperties extends RectProps {
    text: SignalValue<string>;
    icon?: string;
    color?: string;
    textColor?: string;
    iconSize?: number;
    fontSize?: number;
    fontFamily?: string;
}


export class Object extends Rect {
    private textRef = createRef<Txt>()
    private iconRef = createRef<Icon>()

    public readonly text: SimpleSignal<string>;

    private iconSize: number

    public constructor(props: ObjectProperties) {

        const iconSize = props.iconSize ?? 3
        const padding = (iconSize - 2) * 10;

        super({
            ...props,
            fill: props.color ?? '#7e33bd',
            radius: 10,
            layout: true,
            alignItems: 'center',
            direction: 'row',
            padding: () => this.height() === 0 ? 0 : padding,
            paddingLeft: () => (iconSize - 2) * 10 + 15,
            gap: (iconSize - 2) * 20,
            smoothCorners: true,
            shadowColor: '#212121',
            shadowOffsetY: 5,
            shadowBlur: 5,
            clip: true,
        });

        this.iconSize = iconSize;
        this.text = createSignal(props.text)

        this.add(
            <>
                <Icon
                    ref={this.iconRef}
                    scale={iconSize}
                    icon={props.icon ?? 'mdi:cube-outline'}
                />
                <Txt
                    ref={this.textRef}
                    fill={props.textColor ?? "#ffffff"}
                    fontSize={props.fontSize ?? 32}
                    text={() => this.text()}
                    fontFamily={props.fontFamily ?? "Arial"}
                />
            </>
        );
    }

    public textLegacy(text: string, duration?: number, timingFunc?: TimingFunction) {
        return this.textRef().text(text, duration, timingFunc ?? easeInOutCubic)
    }

    public getTargetHeight() {
        const padding = (this.iconSize - 2) * 10

        return Math.max(
            this.iconRef().height(),
            this.textRef().height()
        ) + padding * 2
    }

}
