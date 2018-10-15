# KKIAPAY

[![Build Status](https://travis-ci.org/kkiapay/js-sdk.svg?branch=master)](https://travis-ci.org/kkiapay/js-sdk)
[![npm version](https://img.shields.io/npm/v/kkiapay.svg)](https://www.npmjs.com/package/kkiapay)

Javascript Sdk for KKIAPAY (https://kkiapay.me) API

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

## Mobile Money 

Performing a `Debit` request 

```js
// setup your api key (find one at https://www.kkiapay.me)
const k = kkiapay("<your-api-key>")

//request 100 XOF from 67 43 42 70, mobile money account
k.debit("22967434270",100).then((res) => {
    // handle response
}).catch((err) => {
    //handle error
})
```

## Reference
### Methods 
 *.debit()*  		Details
<table>
<tr><td>Argument</td><td>Type</td><td>Required</td><td>Details</td></tr>
<tr><td>phone</td><td>String</td><td>Yes</td><td>Valid mobile money number to debit. ex : 22967434270 </td></tr>
<tr><td>amount</td><td>Numeric</td><td>Yes</td><td>Amount to debit from user account (XOF) </td></tr>
<tr><td>firstname</td><td>String</td><td>No</td><td>Client firstname </td></tr>
<tr><td>lastname</td><td>String</td><td>No</td><td>Client lastname </td></tr>
<tr><td>email</td><td>String</td><td>No</td><td>Client email address </td></tr>
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
      <td>Description of error</td> 
   </tr>
   <tr>
      <td>account</td>
      <td>((string))</td>
       <td> <code>Failed</code> / <code>Success</code> </td>
      <td>User phone number</td> 
   </tr>
   <tr>
      <td>transactionId</td>
      <td>((string))</td>
       <td> <code>Failed</code> / <code>Success</code> </td>
       <td>Unique Transaction's identifier </td> 
   </tr>
  </tbody>
</table>

