import { State } from "./types";

export function Lift(id: String, currentDirection, currentState: State) {
  this.id = id;
  this.currentDirection = currentDirection;
  this.currentState = currentState;
}

