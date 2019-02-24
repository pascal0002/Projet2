import { Dimension, Constants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "./game-view.service";

let service: GameViewService;
const mockGameCard: GameCard = {
  title: "Bonjour", image: "x.bmp", imageModified: "y.bmp",
  bestTimeSolo: [{ user: "Ali", time: 20 }, { user: "Baba", time: 40 }, { user: "Michel", time: 133 }],
  bestTime1v1: [{ user: "Haxer", time: 1 }, { user: "User231", time: 122 }, { user: "NickPacté", time: 9001 }],
  dimension: Dimension.TWO_DIMENSION,
};



describe("GameViewService", () => {

  const sleep: Function = async (ms: number): Promise<new () => {}> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  beforeEach(() => {
    service.reset();
    service = new GameViewService();
    service.gamecard = mockGameCard;
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
    expect(service.timerModel.time).toBeGreaterThan(1);
  });

  it("should hook correctly the best score timer callback", async () => {
    service.startBestScoreTimer();
    await sleep(Constants.TIMER_RESOLUTION);
    expect(service.timerModel.bestScoreTime).toBeGreaterThan(1);
  });

  it("should reset correctly the timer callback", async () => {
    service.init();
    service.reset();
    await sleep(Constants.TIMER_RESOLUTION);
    expect(service.timerModel.time).toEqual(0);
  });


});
