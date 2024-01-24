export interface Currency {
    currency: string;
    currency_name: string;
    _id: string | undefined;
}

export interface CurrencySettings {
    defaultCurrency: any;
    currencyList: Array<Currency>;
    subscriberCurrency: any;
}