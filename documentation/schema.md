# Lawtorney Database Schema
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Users
##### Description
A table to store all user credentials, tokens, profile info and orders placed by a user.
##### Schema JSON
  ```
  {
      userId: string,
      email: string,
      password: string,
      mobile: string,
      resetToken: string,
      tokens: string,
      isVerified: integer,
      isActive: integer,
      user_role: string,
      orders: Object
        {
            orderId: string,
            orderName: string,
            orderStatus: string
        },
      profile: Object
        {
            name: string,
            gravator: string,
            preference: string
        },
      createdAt: Timestamp,
      updatedAt: Timestamp
  }
  ```
  ##### Example
  ```
  {
      userId: {
        "$oid": "5ec7b415fc767c906877a633"
    },
      "email": "shoaibf@lawtorney.com",
      "password": "$2a$10$.cothoTvNlUniaSXVH6X9.SPVAioJRNggWOrjlgteY/L.5adyXPZW",
      "mobile": string,
      "resetToken": string,
      "tokens": [ ],
      "isVerified": 0,
      "isActive": 1,
      "user_role": customer,
      "orders": 
        {
            "orderId": 5ec7b415fc767c906877a633,
            "orderName": Trademark Registration,
            "orderStatus": 2
        },
      "profile": Object
        {
            "name": Shoaib,
            "gravator": "https://graph.facebook.com/picture?type=large"
        },
      "createdAt": {
        "$date": "2020-08-22T11:14:29.456Z"
        },
      "updatedAt": {
        "$date": "2020-08-22T11:14:29.456Z"
        }
  }
  ```
## customer_orders
##### Description
To store all details of a order placed by a customer.
##### Schema JSON
  ```
  {
      orderId: string,
      orderDate: Timestamp,
      serviceId: string,
      orderStatus: integer,
      formData: Object,
      documents: Object
      {
        documentId: integer,
        documentType: integer,
        documentName: string,
        documentUrl: string
      }
      users: Array,
      transactionId: string,
      deliveryDate: Timestamp,
      expiryDate: Timestamp
  }
  ```
  ##### Example
  ```
  {
      "orderId": {
        "$oid": "5ec7b415fc767c906877a633"
    },
      "orderDate": {
        "$date": "2020-08-01T05:20:04.990Z"
    },
      "serviceId": "5ed4902004a16c308ca7b2f9",
      "orderStatus": 2,
      "formData": [],
      "documents": 
      {
        "documentId": 5ed49020dsd2c308ca7b2f9,
        "documentType": "Address",
        "documentName": "Aadhaar",
        "documentUrl": "www.lawtorney.com/customer_order/aadhaar.jpeg"
      },
      "users": {"5ed49020dsd2c3","7d49020dsd2c308","8ed49020dsd2c"},
      "transactionId": string,
      "deliveryDate": {
        "$date": "2020-08-01T05:20:04.990Z"
    },
      "expiryDate": {
        "$date": "2020-08-01T05:20:04.990Z"
    }
  }
  ```
## services
##### Description
To store all details of all services offered by Lawtorney.
##### Schema JSON
  ```
  {
      serviceId: string,
      serviceName: string,
      serviceDisplayName: string,
      category: integer,
      serviceType: Object,
      description: string,
      contentLink: string,
      icon: string,
      formData: Object,
      meta: Object
  }
  ```
  ##### Example
  ```
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
      "icon": "www.lawtorney/services/gst_reg.jpeg",
      "formData": Object,
      "meta": "Meta data for a service"
  }
  ```

