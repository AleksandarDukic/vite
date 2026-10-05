import { EffectOccurrence, EffectRenderingOrder, EffectType, type Effect } from "./types/Effect";

export const effectFactory = () => createAnimationMode();


const createAnimationMode = () => ({
    static() { return createOrder(false)},
    animated(durationInSeconds: number) {return createOrder(true, durationInSeconds)}
})

const createOrder = (isAnimated: boolean, durationInSeconds: number = 0) => ({
    before() {
        return createType(EffectRenderingOrder.Before, isAnimated, durationInSeconds)
    },
    after() {
        return createType(EffectRenderingOrder.After, isAnimated, durationInSeconds);
    }
});

const createType = (order: EffectRenderingOrder, isAnimated: boolean, durationInSeconds: number = 0) => ({
    disappear: () => createOccurrence(order, EffectType.Disappear, isAnimated, durationInSeconds),
    pulse: () => createOccurrence(order, EffectType.Pulse, isAnimated, durationInSeconds),
    glow: () => createOccurrence(order, EffectType.Glow, isAnimated, durationInSeconds),
});

const createOccurrence = (order: EffectRenderingOrder, type: EffectType, isAnimated: boolean, durationInSeconds: number = 0) => ({
    once: () => buildEffect(order, type, EffectOccurrence.Once, isAnimated, durationInSeconds),
    repeating: () => buildEffect(order, type, EffectOccurrence.Repeating, isAnimated, durationInSeconds),
});



const buildEffect = (order: EffectRenderingOrder, type: EffectType, occurrence: EffectOccurrence, isAnimated: boolean, durationInSeconds: number = 0) => ({
    build: () => {
        const effect: Effect = {
            createdAt: new Date(),
            isAnimated,
            order,
            type,
            occurrence,
            duration: durationInSeconds,
        };
        return effect
    }
})


