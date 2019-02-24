// tslint:disable:no-magic-numbers

import { ElementRef } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { instance, mock } from "ts-mockito";
import { Constants, Dimension } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "./game-view.service";

let service: GameViewService;
let mockConsoleView: ElementRef;
let mockTimerView: CircleProgressComponent;
const mockGameCard: GameCard = {
  title: "Bonjour", image: "x.bmp", imageModified: "y.bmp",
  bestTimeSolo: [{ user: "Ali", time: 20 }, { user: "Baba", time: 40 }, { user: "Michel", time: 133 }],
  bestTime1v1: [{ user: "Haxer", time: 1 }, { user: "User231", time: 122 }, { user: "NickPacté", time: 9001 }],
  dimension: Dimension.TWO_DIMENSION,
};

describe("GameViewService", () => {

  const sleep: Function = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  beforeEach(() => {
    service = new GameViewService();
    service.model.gamecard = mockGameCard;

    mockConsoleView = mock(ElementRef);
    service.consoleEL = mockConsoleView;

    mockTimerView = mock(CircleProgressComponent);
    service.timerEL = instance(mockTimerView);
  });

  afterEach(() => {
    service.reset();
  });

  it("should set properly the timer model", () => {
    expect(service.timerModel).toBeDefined();
  });

  it("should set the correct gold target time on init", () => {
    service.init();
    expect(service.timerModel.targetTime).toEqual(20);
  });

  it("should hook correctly the timer callback", async () => {
    service.startTimer();
    await sleep(Constants.TIMER_RESOLUTION);
    expect(service.timerModel.time).toBeGreaterThan(0);
  });

  it("should hook correctly the best score timer callback", async () => {
    service.startBestScoreTimer();
    await sleep(Constants.TIMER_RESOLUTION + 1000);
    expect(service.timerModel.bestScoreTime).toBeGreaterThan(0);
  });

  it("should reset correctly the timer callback", async () => {
    service.init();
    service.reset();
    await sleep(Constants.TIMER_RESOLUTION);
    expect(service.timerModel.time).toEqual(0);
  });

  it("should cycle when 100%", async () => {
    service.init();
    service.timerModel.targetTime = 1;
    spyOn(service, "onCycle");
    await sleep(Constants.TIMER_RESOLUTION + 1000);
    expect(service.onCycle).toHaveBeenCalled();
  });

  it("should show the next medal on cycle", () => {
    service.onCycle();
    expect(service.timerEL.backgroundColor).toEqual(Constants.SILVER_COLOR);
  });

  it("should increment diffFoundCount", () => {
    service.onDiffFound();
    expect(service.diffFoundCount).toEqual(1);
  });

  it("should increment opponentDiffFoundCount", () => {
    service.onOpponentDiffFound();
    expect(service.opponentDiffFoundCount).toEqual(1);
  });

  it("should return a valid string time with 0s", () => {
    expect(service.timeToString(0)).toEqual("00:00");
  });

  it("should return a valid string time with 5s", () => {
    expect(service.timeToString(5)).toEqual("00:05");
  });

  it("should return a valid string time with 13s", () => {
    expect(service.timeToString(13)).toEqual("00:13");
  });

  it("should return a valid string time with 100s", () => {
    expect(service.timeToString(100)).toEqual("01:40");
  });

  it("should return a valid string time with 600s", () => {
    expect(service.timeToString(600)).toEqual("10:00");
  });

});
