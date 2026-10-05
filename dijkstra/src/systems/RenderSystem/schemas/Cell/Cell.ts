import type { GraphicComponent } from "../../../../components/Graphic/GraphicComponent.interface";
import { EffectRenderingOrder, EffectType, type Effect } from "../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";
import { drawPulse } from "./effects/PulseEffect";

export function drawCell(ctx: CanvasRenderingContext2D, postion: PositionComponent, cellSize: number, graphicComponent: GraphicComponent, entity: number) {
    graphicComponent.effects?.filter(effect => effect.order === EffectRenderingOrder.Before).forEach(effect => {
        effectSelector(effect, ctx, postion, cellSize, entity);
    });

    ctx.setLineDash([1, 7]);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#3F63B8"
    ctx.strokeRect(postion.x - .5, postion.y - .5, cellSize, cellSize);
    ctx.fillText(`${entity}`, postion.x, postion.y + 10);

    ctx.restore();

    graphicComponent.effects?.filter(effect => effect.order === EffectRenderingOrder.After).forEach(effect => {
        effectSelector(effect, ctx, postion, cellSize, entity);
    });
}

function effectSelector(effect: Effect, ctx: CanvasRenderingContext2D, position: PositionComponent, cellSize: number, entity: number) {

    switch (effect.type) {
        case EffectType.Pulse: {
            drawPulse(ctx, position, effect, cellSize, entity);
            break;
        };
    }
}