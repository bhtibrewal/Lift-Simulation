import {
  createHomePage,
  lifts,
  moveLiftToFloor,
  scheduler,
} from "./src/js/main";
import "./src/js/main.ts";
import { Direction, State } from "./src/js/types";
import { Floor, Lift, Scheduler } from "./src/js/utils";

window.onload = () => createHomePage();

setInterval(() => {
  if (scheduler.requests.length) {
    const availableLifts = lifts.filter(
      (lift) => lift.currentState === State.Idle
    );
    if (!availableLifts.length) return; // no lift is available

    const { sourceFloor } = scheduler.requests[0];
    // find if a lift is on that floor
    const liftOnTheRequestedFloor = availableLifts.find(
      (lift) =>
        lift.currentState === State.Idle && lift.currentFloor === sourceFloor
    );
    if (!!liftOnTheRequestedFloor) {
      const request = scheduler.requests.shift();
      moveLiftToFloor(liftOnTheRequestedFloor.id, request);
      return;
    }
    // now find the lift closest
    const closestLift = availableLifts.reduce(
      (closestLift, currLift) => {
        const closestLiftDist = Math.abs(
          sourceFloor - closestLift.currentFloor
        );
        const currLiftDist = Math.abs(sourceFloor - currLift.currentFloor);
        return closestLiftDist <= currLiftDist ? closestLift : currLift;
      },
      { ...availableLifts[0] }
    );
    if (!!closestLift) {
      const request = scheduler.requests.shift();
      moveLiftToFloor(closestLift.id, request);
    }
  }
}, 0);
