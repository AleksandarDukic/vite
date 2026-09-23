import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { IInputSystem } from "./InputSystem.interface";

// potencijalno razloziti na dva sistema - jedan bi samo imao EventListenere i prosledjivao bi u custom in memory EventBus 

// drugi bi slusao event bus i update-ovao Input komponentu entitija
export function createInputSystem(): IInputSystem {

    

    const inputSystem: IInputSystem = {
        update: function (world: IWorld, deltaTime: number) {
            console.log(world.getBus().getPendingMessages())
        }
    }

    return inputSystem;
}