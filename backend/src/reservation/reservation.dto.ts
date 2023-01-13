export class info_per_time{
    startTime: Date;
    endTime: Date;
    skkuding: Number;
    skku_d: Number;
    is_full: Boolean;
}

export class info_per_reservation{
    id: Number;
    name: string;
    club: string;
    startTime: Date;
    endTime: Date;
    purpose: string;
    member: Array<string>;
}