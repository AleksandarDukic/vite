import { createWorld } from './ecs/World';
import { createFps } from './game/factories/FpsFactory';
import { createMainCanvasIndicator } from './game/factories/MainCanvasIndicatorFactory';
import { createCanvasInput } from './input/CanvasInput/CanvasInput';
import { getInMemoryMessageBus } from './message-bus/Types/Bus';
import { ComponentType } from './models/ComponentTypes';
import type { RenderSystemConfig } from './models/RenderSystemConfig';
import './style.css'
import { createFpsSystem } from './systems/FpsSystem/FpsSystem';
import { createInputSystem } from './systems/InputSystem/InputSystem';
import { createCanvasComposeSystem } from './systems/CanvasComposeSystem/CanvasComposeSystem';
import { createPointerSystem } from './systems/PointerSystem/PointerSystem';
import { createRenderSystem } from './systems/RenderSystem/RenderSystem';


// ----- CANVAS INIT -----
const container = document.getElementById("dijkstra");
if (!container) throw Error;
const canvas = document.createElement("canvas");
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;
container.appendChild(canvas);
const ctx = canvas.getContext("2d");
if (!ctx) throw Error;

const backCanvas = document.createElement("canvas");
const backCanvasCtx = backCanvas.getContext("2d");
if (!backCanvasCtx) throw Error;
backCanvas.width = canvas.width;
backCanvas.height = canvas.height;

const frontCanvas = document.createElement("canvas");
const frontCanvasCtx = frontCanvas.getContext("2d");
if (!frontCanvasCtx) throw Error;
frontCanvas.width = canvas.width;
frontCanvas.height = canvas.height;
frontCanvasCtx.globalCompositeOperation = 'source-over';


const mainRenderSystemConfig: RenderSystemConfig = {
  ctx: ctx,
  componentType: ComponentType.Graphic,
  backgroundColor: 'transparent',
  globalAlpha: 1,
}

const backRenderSystemConfig: RenderSystemConfig = {
  ctx: backCanvasCtx,
  componentType: ComponentType.BackGraphic,
  globalAlpha: 1,
  backgroundColor: '#CDC4AF'
}

const frontRenderSystemConfig: RenderSystemConfig = {
  ctx: frontCanvasCtx,
  componentType: ComponentType.FrontGraphic,
  globalAlpha: 0,
  isFrontCanvas: true,
  backgroundColor: 'blue'
}


// ----- MESSAGE BUS -----
const bus = getInMemoryMessageBus();

// ----- BROWSER EVENTS -----
createCanvasInput(canvas, bus);

// ----- WORLD INIT -----
const world = createWorld(bus, canvas.width, canvas.height);
world.attachBus(bus);
createFps(world);
createMainCanvasIndicator(world);

world.addSystem(createInputSystem(bus, world));
world.addSystem(createPointerSystem());
world.addSystem(createFpsSystem());

world.addSystem(createRenderSystem(backRenderSystemConfig));
world.addSystem(createCanvasComposeSystem(ctx, backCanvas));

world.addSystem(createRenderSystem(mainRenderSystemConfig));

world.addSystem(createRenderSystem(frontRenderSystemConfig));
world.addSystem(createCanvasComposeSystem(ctx, frontCanvas));

// ----- GAME LOOP -----
let lastTime = performance.now();
function gameLoop() {
  const now = performance.now();
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;

  world.update(deltaTime);
  requestAnimationFrame(gameLoop);
}

gameLoop();
