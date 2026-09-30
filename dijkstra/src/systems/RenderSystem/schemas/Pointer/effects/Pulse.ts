import type { PositionComponent } from "../../../../../components/Position/PositionComponent.interface";

export function drawPulse(ctx: CanvasRenderingContext2D, postion: PositionComponent) {
    ctx.save();
    const radGrad = ctx.createRadialGradient(postion.x, postion.y, 0, postion.x, postion.y, 15);
    radGrad.addColorStop(0, "#A7D30C");
    radGrad.addColorStop(0.9, "#019F62");
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.roundRect(postion.x - 15, postion.y - 15, 30, 30, 15);
    ctx.fill()
    ctx.restore();
}