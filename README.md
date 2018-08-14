# KKIAPAY

[![Build Status](https://travis-ci.org/kkiapay/js-sdk.svg?branch=master)](https://travis-ci.org/kkiapay/js-sdk)
[![npm version](https://img.shields.io/npm/v/kkiapay.svg)](https://www.npmjs.com/package/kkiapay)

Javascript Sdk for KKIAPAY (www.kkiapay.me) API

## Features

- [x] MTN Mobile Money Debit & Transfer Request
- [x] Flooz Mobile Money Debit Request
- [ ] Ecobank Express Cash
- [ ] Visa card payments
- [ ] Master card payments

## Installing

Using npm:

```bash
$ npm i -s kkiapay
```

Using cdn:

```html
<script src="https://unpkg.com/kkiapay/dist/kkiapay.bundle.js"></script>
```

## Example

## MTN Mobile Money 

Performing a `Debit` request 

```js
// setup your api key (find one at https://www.kkipay.me)
const k = kkiapay("<your-api-key>")

//request 100 XOF from 67 43 42 70, mobile money account
k.debit("22967434270",100).then((res) => {
    // handle response
}).catch((err) => {
    //handle error
})
```

## Reference

 <table>
    <thead>
      <tr>
        <th>Function</th>
        <th>Attributes</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      .debit()
    </tr>
      <tr> 
        <tr><td>phone</td>amount<td>firstname</td><td>lastname</td><td>email</td></tr>
        <tr><td>phone</td>amount<td>firstname</td><td>lastname</td><td>email</td></tr>
      </tr>
    </tbody>
  </table>

### Response
Server responds in 3 cases : 
  - user completes payment with success ( then block  ) 
  - user rejected the approval request ( catch block)
  - user cancels the request for approval ( catch block )
  - timeout - 90s  (catch block )
  - system error ( catch block )

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>When</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>failureCode</td>
      <td>((string))</td>
         <td> <code>Failed</code> </td>
      <td>The status of requested payment                                                               <li> <code>processing_error</code>  System is busy or user already has a pending payment request</li> <li><code>insufficent_fund</code> User account balance is less than requested amount</li>
      </td> 
   </tr>
   <tr>
      <td>failureMessage</td>
      <td>((string))</td>
               <td> <code>Failed</code> </td>

      <td>Description of error
      </td> 
   </tr>
   <tr>
      <td>account</td>
      <td>((string))</td>
               <td> <code>Failed / Success</code> </td>

      <td>User phone number
      </td> 
   </tr>
   <tr>
      <td>transactionId</td>
      <td>((string))</td>
                     <td> <code>Failed / Success</code> </td>

      <td>Unique Transaction identifier
      </td> 
   </tr>
  </tbody>
</table>

Response object
