import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawPointer(ctx: CanvasRenderingContext2D, postion: PositionComponent, effect?: undefined) {
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 25, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
}