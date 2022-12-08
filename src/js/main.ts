import { Direction, State } from "./types";
import { Floor, Lift, Scheduler, Request } from "./utils";
import react, { render } from "./react";
const { createElement } = react;

//constants
const speedOfLift: number = 2;
const doorOpenSpeed = 2500;
const heightOfFloors = 140;

export const floors: Floor[] = [];
export const lifts: Lift[] = [];
export const scheduler = new Scheduler();
export const direction: Direction = Direction.Up;
export const state: State = State.Idle;

const onsubmit = (e) => {
  e.preventDefault();
  const numOfFloors = Number(
    (document.getElementById("no_of_floors") as HTMLInputElement)?.value
  );
  const numOfLifts = Number(
    (document.getElementById("no_of_lift") as HTMLInputElement)?.value
  );
  createBuilding(numOfFloors, numOfLifts);
};

export const createHomePage = () => {
  const homeEl = createElement("main", { class: "home" }, [
    createElement("form", { onsubmit }, [
      createElement("label", { for: "no_of_lift" }, [
        "Number of Lifts",
        createElement(
          "input",
          {
            id: "no_of_lift",
            type: "number",
            min: "1",
            max: "6",
            value: "1",
          },
          []
        ),
      ]),
      createElement("label", { for: "no_of_floors" }, [
        "Number of Floors",
        createElement(
          "input",
          {
            id: "no_of_floors",
            type: "number",
            min: "1",
            max: "8",
            value: "1",
          },
          []
        ),
      ]),
      createElement("button", { class: "btn btn_submit", type: "submit" }, [
        "Submit",
      ]),
    ]),
  ]);
  window["root"].lastElementChild?.remove();
  render(homeEl, window["root"]);
};

/*  */
const handleButtonClick = (e: { target: Element }, id) => {
  const { classList } = e.target;
  if (classList.contains("btn")) {
    const requestedDirection = classList.contains("btn_down")
      ? Direction.Down
      : Direction.Up;
    scheduler.requests.push({
      sourceFloor: id,
      directionToGo: requestedDirection,
    });
  }
};
const handleReset = () => {
  lifts.forEach((_, index) => {
    const id = `lift-${index}`;
    const lift = new Lift(id, direction, state);
    lifts[index] = lift;

    moveLiftToFloor(id, { sourceFloor: 0, directionToGo: Direction.Up });
  });
};

export const createBuilding = (numOfFloors, numOfLifts) => {
  const buildingEl = createElement("div", { class: "building" }, []);
  buildingEl.children.push(
    createElement("div", { class: "main_btns" }, [
      createElement(
        "button",
        { class: "btn back_btn", onclick: () => createHomePage() },
        ["Back"]
      ),
      createElement(
        "button",
        { class: "btn reset_btn", onclick: handleReset },
        ["Reset"]
      ),
    ])
  );

  for (let i = numOfFloors - 1; i >= 0; i--) {
    const floor = new Floor(i);
    floors[i] = floor;

    const floorEl = createElement(
      "div",
      {
        class: "floor",
        id: i,
      },
      [
        createElement(
          "div",
          { class: "btn_container", onclick: (e) => handleButtonClick(e, i) },
          [
            createElement("h3", { class: "floor_no" }, [`Floor ${i}`]),
            i !== numOfFloors &&
              createElement("button", { class: "btn btn_up fa fa-arrow-up" }),
            i !== 0 &&
              createElement("button", {
                class: "btn btn_down fa fa-arrow-down",
              }),
          ]
        ),
      ]
    );

    if (i == 0) {
      const lifts = createLifts(numOfLifts);
      floorEl.children.push(...lifts);
    }

    buildingEl.children.push(floorEl);
  }
  window["root"].lastElementChild?.remove();
  render(buildingEl, window["root"]);
};

export const createLifts = (numOfLifts) => {
  const liftsEl = Array(numOfLifts)
    .fill(0)
    .map((_, i) => {
      const lift = new Lift(`lift-${i}`, direction, state);
      lifts[i] = lift;
      return createElement("div", { class: "lift", id: `lift-${i}` }, [
        createElement("div", { class: "door_left" }),
        createElement("div", { class: "door_right" }),
      ]);
    });
  return liftsEl;
};


export const moveLiftToFloor = (id, request: Request) => {
  const index = Number(id.split("-")[1]);
  const destinationFloor = request.sourceFloor;
  const floorDiff = destinationFloor - lifts[index].currentFloor;
  const numOfFloorsToMove = Math.abs(floorDiff);
  const timeToCoverDist = numOfFloorsToMove * speedOfLift;

  const liftElement = window[id as string] as HTMLElement;

  lifts[index].currentState = State.Moving;
  lifts[index].currentDirection = floorDiff < 0 ? Direction.Down : Direction.Up;
  liftElement.style.transitionDuration = `${timeToCoverDist}s`;
  liftElement.style.top = `-${destinationFloor * heightOfFloors}px`;

  setTimeout(() => {
    lifts[index].currentState = State.Stop;
    liftElement.classList.toggle("open");
    lifts[index].currentFloor = destinationFloor;

    setTimeout(() => {
      liftElement.classList.toggle("open");

      setTimeout(() => {
        lifts[index].currentState = State.Idle;
      }, doorOpenSpeed);
    }, doorOpenSpeed);
  }, timeToCoverDist * 1000);
};
