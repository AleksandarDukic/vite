import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawCell(ctx: CanvasRenderingContext2D, postion: PositionComponent, effect?: undefined) {
    ctx.strokeRect(postion.x, postion.y, 40, 40);
}