import { formatDate } from "@angular/common";

export class Utils {

  public static timeInSecondsToFormattedTime(seconds: number, format: string = "mm:ss"): string {
    const d: number = new Date().setSeconds(seconds);

    return formatDate(d, format, "en-US");
  }
}
