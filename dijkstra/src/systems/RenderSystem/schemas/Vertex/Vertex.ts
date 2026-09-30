import type { Effect } from "../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawVertex(ctx: CanvasRenderingContext2D, postion: PositionComponent, effects?: Effect[]) {
    ctx.arc(postion.x, postion.y, 15, 0, Math.PI * 2, true);
    ctx.stroke();
}