import * as soap from 'soap';
export declare class Client {
    private _key;
    private _service;
    private _wsdl;
    private _soapClientPromise;
    constructor({ key, dev }?: {
        key?: string;
        dev?: boolean;
    });
    createClient(): Promise<soap.Client>;
    login(): Promise<any>;
    private addAction;
    get soapClientPromise(): Promise<soap.Client>;
}
