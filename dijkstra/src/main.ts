import { createWorld } from './ecs/World';
import { createCanvasInput } from './input/CanvasInput/CanvasInput';
import { getInMemoryMessageBus } from './message-bus/Types/Bus';
import { ComponentType } from './models/ComponentTypes';
import './style.css'
import { createInputSystem } from './systems/InputSystem/InputSystem';
import { createPointerSystem } from './systems/PointerSystem/PointerSystem';
import { createRenderSystem } from './systems/RenderSystem/RenderSystem';


// ----- CANVAS INIT -----
const container = document.getElementById("dijkstra");
const canvas = document.createElement("canvas");
if (container) {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  container.appendChild(canvas);
}
const ctx = canvas.getContext("2d");
if (!ctx) throw Error;

const backCanvas = document.createElement("canvas");
const backCanvasCtx = backCanvas.getContext("2d");
if (!backCanvasCtx) throw Error;
backCanvas.width = canvas.width;
backCanvas.height = canvas.height;

const frontCanvas = document.createElement("canvas");
const frontCanvasCtx = backCanvas.getContext("2d");
if (!frontCanvasCtx) throw Error;
frontCanvas.width = canvas.width;
frontCanvas.height = canvas.height;



// ----- MESSAGE BUS -----
const bus = getInMemoryMessageBus();

// ----- BROWSER EVENTS -----
createCanvasInput(canvas, bus);

// ----- WORLD INIT -----
const world = createWorld(bus, canvas.width, canvas.height);
world.attachBus(bus);

world.addSystem(createInputSystem(bus, world));
world.addSystem(createPointerSystem());
world.addSystem(createRenderSystem(backCanvasCtx, ComponentType.BackGraphic));
world.addSystem(createRenderSystem(ctx, ComponentType.Graphic, backCanvas, frontCanvas));



//ctx!.drawImage(backCanvas, 0, 0);
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
