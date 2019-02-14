import * as fs from "fs";
import { injectable } from "inversify";

@injectable()
export class SnapshotWriterService {

    public constructor() {/**/}

    public makeSnapshot(data: string, filename: string): void {
        fs.writeFileSync(process.cwd() + "/public/snapshots/" + filename, data);
    }
}
