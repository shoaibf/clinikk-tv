# Lawtorney API Documentation

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/Cubenest/lawtorney-customer-api-app)


### Objective
Build a backend stack for user management, order management and display the services avalaible and ordered by customers.
### Stack
Platform: Node.JS Language: Typescript Package Manager: npm Database: JSON file Frameworks & Libraries:
- express - For API Engine
- body-parser - For request body parsing
- cors - For Cross-Origin-Resource-Sharing support
- express-validator - For schema validation

## API Specs

#### List all services
Endpoint: GET api/services
Sample Response:
```
[
{
    "serviceId": {
      "$oid": "5ec7b415fc767c906877a633"
    },
    "serviceName": "gstRegistration",
    "serviceDisplayName": "GST Registration",
    "category": "Tax",
    "serviceType": "Lawyer",
    "description": "Our Service offers GST Registration in India.
                  Quickly and Efficiently at Affordable Rate.
                  We give 100% online service.",
    "contentLink": "https://docs.google.com/spreadsheets/d/JYasdasdasda/",
    "icon": "www.lawtorney/services/gst_reg.jpeg"
},
"serviceId": {
      "$oid": "5ec7b415fc767c32342377a633"
    },
    "serviceName": "Copyright",
    "serviceDisplayName": "Registration of Logo/artistic works",
    "category": "Copyright",
    "serviceType": "Lawyer",
    "description": "The copyright deposit of a work (literary, artistic, musical …) allows one to prove one's authorship."                    ."
    "contentLink": "https://docs.google.com/spreadsheets/d/Casdasdasdsda/",
    "icon": "www.lawtorney/services/copyright.jpeg"
]
```
#### List services by category/type
Endpoint: GET api/services/:category
Sample Response:
```
[
{
    "serviceId": {
      "$oid": "5ec7b415fc767c906877a633"
    },
    "serviceName": "gstRegistration",
    "serviceDisplayName": "GST Registration",
    "category": "Tax",
    "serviceType": "Lawyer",
    "description": "Our Service offers GST Registration in India.
                  Quickly and Efficiently at Affordable Rate.
                  We give 100% online service.",
    "contentLink": "https://docs.google.com/spreadsheets/d/JYasdasdasda/",
    "icon": "www.lawtorney/services/gst_reg.jpeg"
}
]
```
#### List single service
Endpoint: GET api/services/:serviceName
Sample Response:
```
[
{
    "serviceId": {
      "$oid": "5ec7b415fc767c906877a633"
    },
    "serviceName": "gstRegistration",
    "serviceDisplayName": "GST Registration",
    "category": "Tax",
    "serviceType": "Lawyer",
    "description": "Our Service offers GST Registration in India.
                  Quickly and Efficiently at Affordable Rate.
                  We give 100% online service.",
    "contentLink": "https://docs.google.com/spreadsheets/d/JYasdasdasda/",
    "icon": "www.lawtorney/services/gst_reg.jpeg"
}
]
```
#### List orders of a customer
All orders - Endpoint: GET api/orders
Orders by status - Endpoint: GET api/orders?orderStatus=1
Single order - Endpoint GET api/orders/:orderId
Sample Response:
```
[
{
    "orderId": {
      "$oid": "5ec7b415fc767c906877a633"
  },
    "orderDate": {
      "$date": "2020-08-01T05:20:04.990Z"
  },
    "serviceId": "5ed4902004a16c308ca7b2f9",
    "orderStatus": 2,
    "paymentStatus":1,
    "formData": [],
    "documents": 
    {
      "documentId": 5ed49020dsd2c308ca7b2f9,
      "documentType": "Address",
      "documentName": "Aadhaar",
      "documentUrl": "www.lawtorney.com/customer_order/aadhaar.jpeg"
    },
    "users": {"5ed49020dsd2c3","7d49020dsd2c308","8ed49020dsd2c"},
    "transactionId": "",
    "deliveryDate": {
      "$date": "2020-08-01T05:20:04.990Z"
  },
    "expiryDate": {
      "$date": "2020-08-01T05:20:04.990Z"
  }
}]
```
#### Create an order
Endpoint: POST api/orders
```
{
    "serviceId": "5ed4902004a16c308ca7b2f9",
    "users":{"5ed49020dsd2c3"},
    "paymentStatus":1,
    "formData": [],
    "documents":[],
    "transactionId":"ifPaidStringElseEmpty"
}
```
Result
```
{
    orderId:"25ed49]4a16c308ca7b2f9",
    Location:"https://www.lawtorney/myorders/:orderId",
    Message:"Order placed successfully"
}
```
#### Update an order by admin
Endpoint: POST api/orders/:orderId
Following fields of an order can be updated
- orderStatus
- transactionId
- deliveryDate
- paymentStatus
- comments
```
{
    "orderStatus":3,
    "transactionId":"sadaasd3dqsd",
    "deliveryDate": "2020-08-01T05:20:04.990Z",
    "paymentStatus":2,
    "comments":"Sent to lawyer for audit"
}
```
