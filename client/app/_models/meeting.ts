export interface Meeting {
    externalID: string;
    summary: string;
    room: string;
    start: Date;
    end: Date;
    externals: any[];
    meetees: any[];
}
