import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawPointer(ctx: CanvasRenderingContext2D, postion: PositionComponent, effect?: undefined) {
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 15, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 3, 0, Math.PI * 2, true)
    ctx.fill();
    
}