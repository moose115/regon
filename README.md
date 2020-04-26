# REGON
[Polish README](https://github.com/mustaf115/regon/blob/master/README_PL.md)

REGON is Polish company registry. This library is an interface connecting to BIR1.1 service.

## Instalation

`npm i regon`
or
`yarn add regon`

## Usage

First you need to obtain REGON API key ([instruction](https://api.stat.gov.pl/Home/RegonApi?lang=en)).

Then:
```js
// Typescript import
import { Regon } from 'Regon';
// CommonJS require
const Regon = require('Regon');

const regon = new Regon({ key: 'api_key' }); // or new Regon({ dev: true }) for testing purposes, key not required

const searchParameters: ParametryWyszukiwania = {
	Krs?: string,
	Krsy?: string[],
	Nip?: string,
	Nipy?: string[],
	Regon?: string,
	Regony14zn?: string[],
	Regony9zn?: string[]
};

regon.getCompanyData(searchParameters) // returns Promise
	.then( companyInfo => ... );
```
