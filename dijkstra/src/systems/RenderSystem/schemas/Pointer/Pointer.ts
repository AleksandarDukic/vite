import { EffectRenderingOrder, EffectType, type Effect } from "../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";
import { drawPulse } from "./effects/Pulse";
import { drawGlow } from "./effects/Glow";
import type { GraphicComponent } from "../../../../components/Graphic/GraphicComponent.interface";

export function drawPointer(ctx: CanvasRenderingContext2D, postion: PositionComponent, graphicComponent: GraphicComponent) {

    graphicComponent.effects?.filter(effect => effect.order === EffectRenderingOrder.Before).forEach(effect => {
        effectSelector(effect, ctx, postion);
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

    graphicComponent.effects?.filter(effect => effect.order === EffectRenderingOrder.After).forEach(effect => {
        effectSelector(effect, ctx, postion);
    });
}


// private

function effectSelector(effect: Effect, ctx: CanvasRenderingContext2D, position: PositionComponent) {
    switch (effect.type) {
        case EffectType.Pulse: {
            drawPulse(ctx, position, effect);
            break;
        };
        case EffectType.Glow: {
            drawGlow(ctx, position, effect);
            break;
        };
    }
}