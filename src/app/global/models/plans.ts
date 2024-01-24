export interface Plans {
    activationDate: string;
    country: string;
    createdAt: Date;
    currency: string;
    cycle: number;
    cycleUnits: string;
    data: string;
    expiredDate: Date;
    expiredNotified: boolean;
    expiryDate: Date;
    expiryNotified: boolean;
    flag: string;
    iccid: string;
    isActive: boolean;
    isAutoRefillOn: boolean;
    name: string;
    price: number;
    productCategory: string;
    purchaseDate: string;
    status: string;
    validity: number;
    _id: string;
    totalData: number;
    usedData: number;
}