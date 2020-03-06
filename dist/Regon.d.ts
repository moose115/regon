import * as soap from 'soap';
interface ParametryWyszukiwania {
    Krs?: string;
    Krsy?: string[];
    Nip?: string;
    Nipy?: string[];
    Regon?: string;
    Regony14zn?: string[];
    Regony9zn?: string[];
}
export declare class Regon {
    private _key;
    private _service;
    private _wsdl;
    private _soapRegonPromise;
    constructor({ key, dev }?: {
        key?: string;
        dev?: boolean;
    });
    createRegon(): Promise<soap.Client>;
    login(): Promise<any>;
    logout(sid: string): Promise<any>;
    getCompanyData(params: ParametryWyszukiwania): Promise<any>;
    private addAction;
}
export {};
