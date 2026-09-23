import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { MessageProcessSystem } from "./MessageProcessSystem.interface";

export function createMessageProcessSystem(): MessageProcessSystem {

    const messageProcessSystem: MessageProcessSystem = {
        update: function (world: IWorld, deltaTime: number) {
            const bus = world.getBus();
            const pendingEventMessages = bus.getPendingEventMessages();

            pendingEventMessages.forEach(message => {
                bus.publish(message.message)
            });
            bus.deletePendingEventMessages()
        }
    }

    return messageProcessSystem;
}