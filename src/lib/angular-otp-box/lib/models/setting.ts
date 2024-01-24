export class Setting {
    inputStyles?: { [key: string] : string };
    wrapperStyles?: { [key: string]: string };
    allowKeyCodes?: string[];
    length = 4;
    numbersOnly?: boolean;
    inputClass?: string;
    wrapperClass?: string;
    timer?: number;
    btnClass?: string;
    timerType?: number; //  0: secs, 1: mins
    btnText?: string;
    btnLabel?: string;
}