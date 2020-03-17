import { SERVICE_TEST, SERVICE, WSDL_TEST, WSDL, ACTION, ACTION_ZALOGUJ, ACTION_SZUKAJ_PODMIOTY, ACTION_WYLOGUJ } from './constants';
import * as soap from 'soap';
import { parseStringPromise } from 'xml2js';

interface ParametryWyszukiwania {
  Krs?: string,
  Krsy?: string[],
  Nip?: string,
  Nipy?: string[],
  Regon?: string,
  Regony14zn?: string[],
  Regony9zn?: string[]
}

export class Regon {
  private _key: string
  private _service: string
  private _wsdl: string
  private _soapRegonPromise: Promise<soap.Client>
  
  constructor({ key = '', dev = false } = {}) {
    this._key = dev ? 'abcde12345abcde12345' : key;
    this._service = dev ? SERVICE_TEST : SERVICE;
    this._wsdl = dev ? WSDL_TEST : WSDL;
    this._soapRegonPromise = this.createRegon();
  }

  createRegon(): Promise<soap.Client> {
    return soap
      .createClientAsync(this._wsdl, { forceSoap12Headers: true })
      .then( (regon: soap.Client) => {
        regon.addHttpHeader('Content-Type', 'application/soap+xml; charset=utf-8');
        return regon;
      });
  }
    
  async login(): Promise<any> {
    try {
      const regon = await this._soapRegonPromise;
      this.addAction(regon, ACTION_ZALOGUJ);
      const sid = regon
        .ZalogujAsync({ pKluczUzytkownika: this._key })
        .then( (res: any) => res[0].ZalogujResult );
      return sid;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(sid: string): Promise<any> {
    try {
      const regon = await this._soapRegonPromise;
      this.addAction(regon, ACTION_WYLOGUJ);
      const hasLoggedOut = await regon
        .WylogujAsync({ pIdentyfikatorSesji: sid })
        .then( (res: any) => res[0].WylogujResult );
      return hasLoggedOut;
    } catch (error) {
      console.log(error);
    }
  }

  async getCompanyData(params: ParametryWyszukiwania) {
    try {
      const regon = await this._soapRegonPromise;
      const sid = await this.login();
      regon.addHttpHeader('sid', sid);
      this.addAction(regon, ACTION_SZUKAJ_PODMIOTY);
      const data = regon
        .DaneSzukajPodmiotyAsync({ pParametryWyszukiwania: params })
        .then( (res: any) => parseStringPromise(res[0].DaneSzukajPodmiotyResult))
        .then( (res: any) => res.root && res.root.dane[0] && res.root.dane[0])
        .catch( (error: any) => console.log(error) );
      await this.logout(sid);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  private addAction(regon: soap.Client, action: string): void {
    regon.clearSoapHeaders();
    regon.addSoapHeader({
      To: this._service,
      Action: ACTION + action
    },
    '',
    'wsa',
    'http://www.w3.org/2005/08/addressing'
    );
  }
}