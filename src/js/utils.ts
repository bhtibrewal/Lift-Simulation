import { Direction, State, TLift } from "./types";

export class Lift {
  constructor(id: String, currentDirection: Direction, currentState: State) {
    this.id = id;
    this.currentDirection = currentDirection;
    this.currentState = currentState;
  }
  id: String;
  currentDirection: Direction;
  currentState: State;
}

export class Floor {
  constructor(id: String) {
    this.id = id;
  }
  id: String;
}
