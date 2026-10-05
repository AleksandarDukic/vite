import type { Effect } from "../../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../../components/Position/PositionComponent.interface";

export function drawPulse(ctx: CanvasRenderingContext2D, postion: PositionComponent, effect: Effect) {
    ctx.save();
    let normalizedTime = ((new Date().getTime() - effect.createdAt.getTime()) % (effect.duration! * 1000)) / (effect.duration! * 1000);
    let fnTime = (1 - Math.abs(2 * normalizedTime - 1));

    const radGrad = ctx.createRadialGradient(postion.x, postion.y, 3, postion.x, postion.y, 3 + 12 * fnTime);
    radGrad.addColorStop(0, "#A7D30C");
    radGrad.addColorStop(0.9, "#019F62");
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.roundRect(postion.x - 15, postion.y - 15, 30, 30, 15);
    ctx.fill()
    ctx.restore();
}