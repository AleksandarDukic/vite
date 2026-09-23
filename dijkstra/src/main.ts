import { createWorld } from './ecs/World';
import { attachEventListeners } from './game';
import { createCanvasInput } from './input/CanvasInput/CanvasInput';
import { getInMemoryMessageBus } from './message-bus/Types/Handler';
import './style.css'
import { createMessageProcessSystem } from './systems/MessageProcessSystem/MessageProcessSystem';
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



// ----- MESSAGE BUS -----
const bus = getInMemoryMessageBus();

//    Dodati za svaki canvas event funkciju koja ce da se poziva
//    za svaki ce se updateovati pozicija i kvadrant u kome je
//    za Press ce proveravati da li 
      //   cuvamo poziciju Press-a
      //   1) ako smo na vertexu i pozicija se pomeri zapocinjemo drag vertexa


      // za Release 
      //   1) dodajemo vertex - nema vertexa u definisanoj blizini    
      //   2) dodajemo edge ako smo na vertexu
      //   3) zatvarmo edge ako smo na drugom vertexu koji nije vec povezan
      //   4) brisemo vertex ili edge ako je desni klik


// ----- BROWSER EVENTS -----
createCanvasInput(canvas, bus);

// ----- WORLD INIT -----
const world = createWorld(bus);
world.attachBus(bus);
attachEventListeners(bus, world)

// prvi sistem za okidanje MessageBuss.Publish Schedulovanih eventova
// updateujemo poziciju nevidljivog Cursora
// proveravamo da li mozemo da dodamo/oduzmemo vertex/edge

// prvo treba da bude createMessagingSystem koji ce da uzme sve pending poruke i da ih publishuje
// iznad za svaki taj event dodaj handler - to mogu da budu funkcije iz nekog sistema koji ce defakto biti pozvan iz messaging sistema 
world.addSystem(createMessageProcessSystem());
//world.addSystem(createInputSystem());
world.addSystem(createRenderSystem(ctx));

// ----- GAME LOOP -----
let lastTime = performance.now();
function gameLoop() {
  const now = performance.now();
  const deltaTime = (now - lastTime) / 1000;
  lastTime = now;
  world.update(deltaTime)
  requestAnimationFrame(gameLoop);
}

gameLoop();
