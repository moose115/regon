import { ParametryWyszukiwania, ParametryPelnyRaport } from './interfaces';
export declare const envelopeZaloguj: (key: string) => string;
export declare const envelopeWyloguj: (sid: string) => string;
export declare const envelopeDaneSzukajPodmioty: (params: ParametryWyszukiwania) => string;
export declare const envelopeDanePobierzPelnyRaport: (params: ParametryPelnyRaport) => string;
