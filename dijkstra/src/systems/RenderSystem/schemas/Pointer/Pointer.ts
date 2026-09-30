import type { Effect } from "../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";
import { drawPulse } from "./effects/Pulse";
import { EffectRenderingOrder } from "../../../../components/Graphic/types/EffectRenderingOrder";
import { EffectType } from "../../../../components/Graphic/types/EffectType";
import { drawGlow } from "./effects/Glow";

export function drawPointer(ctx: CanvasRenderingContext2D, postion: PositionComponent, effects?: Effect[]) {

    effects?.filter(effect => effect.order === EffectRenderingOrder.Before).forEach(effect => {
        switch (effect.type) {
            case EffectType.Pulse: {
                drawPulse(ctx, postion);
                break;
            }
        }
    });

    ctx.save();
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 15, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 3, 0, Math.PI * 2, true)
    ctx.fill();
    ctx.restore();

    effects?.filter(effect => effect.order === EffectRenderingOrder.After).forEach(effect => {
        switch (effect.type) {
            case EffectType.Pulse: {
                drawPulse(ctx, postion);
                break;
            }
            case EffectType.Glow: {
                drawGlow(ctx, postion);
                break;
            }

        }
    });
}

// function effectSelector(effect: Effect) {
//     switch (effect.type) {
//         case EffectType.Pulse: {
//             drawPulse(ctx, postion);
//             break;
//         }
//         case EffectType.Glow: {
//             drawGlow(ctx, postion);
//             break;
//         }

//     }
// }