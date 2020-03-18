import { ParametryWyszukiwania } from './interfaces';
export declare class Regon {
    private _key;
    private _service;
    private _wsdl;
    constructor({ key, dev }?: {
        key?: string;
        dev?: boolean;
    });
    login(): Promise<any>;
    logout(sid: string): Promise<any>;
    sendEnvelope(envelope: string, sid?: string): Promise<any>;
    getCompanyData(params: ParametryWyszukiwania): Promise<any>;
}
