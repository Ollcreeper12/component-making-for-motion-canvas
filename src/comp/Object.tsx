import {Icon, Rect, RectProps, Txt} from '@motion-canvas/2d';
import {
    all,
    createRef,
    createSignal,
    easeInOutCubic,
    SignalValue,
    SimpleSignal,
    TimingFunction
} from "@motion-canvas/core";

export interface ObjectProperties extends RectProps {
    text: SignalValue<string>;
    icon?: string;
    color?: string;
    textColor?: string;
    iconSize?: SignalValue<number>;
    fontSize?: number;
    fontFamily?: string;
}


export class Object extends Rect {
    public readonly text: SimpleSignal<string>;
    private textRef = createRef<Txt>()
    private iconRef = createRef<Icon>()
    private iconSize: SimpleSignal<number>;

    private paddingOverrideActive = createSignal(false);
    private paddingOverrideValue = createSignal(0);

    public constructor(props: ObjectProperties) {

        super({
            ...props,
            fill: props.color ?? '#7e33bd',
            radius: 10,
            layout: true,
            alignItems: 'center',
            direction: 'row',
            padding: () =>
                this.paddingOverrideActive() ?
                    this.paddingOverrideValue() :
                    (Math.max(3, this.iconSize() ?? 3) - 2) * 10,

            paddingLeft: () => (Math.max(3, this.iconSize() ?? 3) - 2) * 10 + 15,

            gap: () => (Math.max(3, this.iconSize() ?? 3) - 2) * 20,
            smoothCorners: true,
            shadowColor: '#212121',
            shadowOffsetY: 5,
            shadowBlur: 5,
            clip: true,
        });

        this.iconSize = createSignal(props.iconSize);
        this.text = createSignal(props.text)

        this.add(
            <>
                <Icon
                    ref={this.iconRef}
                    scale={this.iconSize() ?? 3}
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

    public textLegacyAnimate(text: string, duration?: number, timingFunc?: TimingFunction) {
        return this.textRef().text(text, duration ?? 1, timingFunc ?? easeInOutCubic)
    }

    public getTargetHeight() {
        const padding = (this.icn() - 2) * 10

        return Math.max(
            this.iconRef().height(),
            this.textRef().height()
        ) + padding * 2
    }

    public getPaddingDynamicValue() {
        return (this.icn() - 2) * 10
    }

    public* paddingOverride(value: number, time?: number, timingFunction?: TimingFunction) {
        this.paddingOverrideActive(true);

        yield* this.paddingOverrideValue(value, time ?? 1, timingFunction ?? easeInOutCubic)
    }

    public* paddingStopOverride(time?: number, timingFunction?: TimingFunction) {
        yield* this.paddingOverrideValue(this.getPaddingDynamicValue(), time ?? 1, timingFunction ?? easeInOutCubic)

        this.paddingOverrideActive(false)
    }

    public* animateFromFlat(time?: number, timingFunction?: TimingFunction) {
        yield* all(
            this.height(0, 0).to(this.getTargetHeight(), time ?? 1, timingFunction ?? easeInOutCubic),
            this.paddingOverride(0, time ?? 1, timingFunction ?? easeInOutCubic),
            this.paddingStopOverride(time ?? 1, timingFunction ?? easeInOutCubic),
        );
    }

    public* animateToFlat(time?: number, timingFunction?: TimingFunction) {
        yield* all(
            this.height(0, time ?? 1, timingFunction ?? easeInOutCubic),
            this.paddingOverride(0, time ?? 1, timingFunction ?? easeInOutCubic),
        );
    }

    private icn() {
        return Math.max(3, this.iconSize() ?? 3)
    }

    private getPadding() {
        return (this.icn() - 2) * 10
    }

}
