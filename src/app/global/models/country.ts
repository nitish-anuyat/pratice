export interface Country {
    code: string;
    customerId: string;
    dial_code: string; 
    flag: string;
    imsis: Array<{imsiId: string}>
    isPopular: boolean;
    iso3code: string;
    name: string;
    _id: string;
}