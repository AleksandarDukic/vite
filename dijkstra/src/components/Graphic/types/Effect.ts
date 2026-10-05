export type Effect = {
    createdAt: Date,
    isAnimated: boolean,
    order: EffectRenderingOrder
    type: EffectType,
    occurrence: EffectOccurrence,
    duration?: number
};

const EffectRenderingOrder = {
    Before: 'Before',
    After: 'After'

} as const
export { EffectRenderingOrder }
export type EffectRenderingOrder = typeof EffectRenderingOrder[keyof typeof EffectRenderingOrder];


const EffectType = {
    Disappear: 'Disappear',
    Pulse: 'Pulse',
    Glow: 'Glow'

} as const
export { EffectType }
export type EffectType = typeof EffectType[keyof typeof EffectType];

const EffectOccurrence = {
    Once: 'Once',
    Repeating: 'Repeating'

} as const
export { EffectOccurrence }
export type EffectOccurrence = typeof EffectOccurrence[keyof typeof EffectOccurrence];