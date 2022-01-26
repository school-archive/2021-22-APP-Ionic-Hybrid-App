export class TimeEntryModel {
    startTime: Date;
    endTime: Date;
    tags: String[];

    constructor(startTime: Date, endTime: Date, tags: String[]) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.tags = tags;
    }
}