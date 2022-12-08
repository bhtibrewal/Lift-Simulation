# Lift-Simulation

Create a web app where you can simulate lift mechanics for a client

# Entry Point

- To start the app run `yarn start`.


## Structure

```
export enum Direction {
  Up = 1,
  Down = 0,
}
export enum State {
  Moving = 1,
  Idle = 0,
  Stop = -1,
}
export class Lift {
  constructor(id: string, currentDirection: Direction, currentState: State) {
    this.id = id;
    this.currentDirection = currentDirection;
    this.currentState = currentState;
  }
  id: string;
  currentDirection: Direction;
  currentState: State;
  currentFloor: number = 0;
}

export class Floor {
  constructor(id: number) {
    this.id = id;
  }
  id: number;
  readonly working: Boolean = true;
}
export class Request {
  sourceFloor: number;
  directionToGo: Direction;
}

export class Scheduler {
  requests: Request[] = [];
}
```
![Lift Simulation ](https://user-images.githubusercontent.com/42600164/206402483-207c814b-9a3b-400b-bea6-8918d1640e0f.png "Lift Simulation ")

# Features

1. A page where you input the number of floors and lifts from the user
2. An interactive UI is generated, where we have visual depictons of lifts and buttons on floors
3. Upon clicking a particular button on the floor, a lift goes to that floor

Milestone 1:

- Data store that contains the state of your application data
- JS Engine that is the controller for which lift goes where
- Dumb UI that responds to controller's commands

Milestone 2:

- Lift having doors open in 2.5s, then closing in another 2.5s
- Lift moving at 2s per floor
- Lift stopping at every floor where it was called
- Mobile friendly design

# Accesibility Checks

[x] Constrast
[x] Semantics


# Future Scope

- Floors have working - treu/false state
- Power cut case
- handling Internal Requests




