//export type EffectType = 'Focused';

const EffectType = {
    Dissapear: 'Dissapear',
    Hover: 'Hover',
    AdjacentHover: 'AdjacentHover',
    Pulse: 'Pulse',
    Glow: 'Glow'

} as const

export { EffectType }

export type EffectType = typeof EffectType[keyof typeof EffectType];