const EffectRenderingOrder = {
    Before: 'Before',
    After: 'After'

} as const
export { EffectRenderingOrder }
export type EffectRenderingOrder = typeof EffectRenderingOrder[keyof typeof EffectRenderingOrder];