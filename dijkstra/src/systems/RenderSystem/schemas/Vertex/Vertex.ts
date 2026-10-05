import type { GraphicComponent } from "../../../../components/Graphic/GraphicComponent.interface";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawVertex(ctx: CanvasRenderingContext2D, postion: PositionComponent, graphicComponent: GraphicComponent) {
    ctx.arc(postion.x, postion.y, 15, 0, Math.PI * 2, true);
    ctx.stroke();
}