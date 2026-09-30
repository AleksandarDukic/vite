import type { PositionComponent } from "../../../../../components/Position/PositionComponent.interface";

export function drawGlow(ctx: CanvasRenderingContext2D, postion: PositionComponent) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(postion.x, postion.y, 15, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.restore();

    ctx.save();
    const radGrad = ctx.createRadialGradient(postion.x, postion.y, 0, postion.x, postion.y, 20);
    radGrad.addColorStop(0, "#d3550cff");
    radGrad.addColorStop(0.5, "#eea60bff");
    radGrad.addColorStop(1, "#fa000000");
    ctx.fillStyle = radGrad;
    ctx.roundRect(postion.x - 20, postion.y - 20, 40, 40, 20);
    ctx.fill()
    ctx.restore();



}