import type { EffectRenderingOrder } from "./EffectRenderingOrder"
import type { EffectType } from "./EffectType"

export type Effect = {
    order: EffectRenderingOrder
    type: EffectType, 
    duration?: number
}   
    