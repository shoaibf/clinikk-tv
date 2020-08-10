
## Lawtorney Database Schema

### Table: users

A table all user credentials

**user_id**: (String(unique))

**email**: (String)

**password**: (String)

**mobile**: (String)

**resetToken**: (String)

**tokens**: (String)

**isVerified**: (Integer)

**isActive**: (Integer)

**user_role**: (String)

**orders**: (Object)
    **orderId**: (String)
    **orderName**: (String)
    **orderStatus**: (String)
    

**profile**: (Object)
    **name**: (String)
    **gravator**: (String)

**createdAt**: (Timestamp)

**updatedAt**: (Timestamp)



### Table: customer_orders

**orderId**: (String(unique))

**orderDate**: (Timestamp)

**serviceId**: (String)

**orderStatus**: (Timestamp)

**formData**: (Object)

**documents**: (Object)
    **documentId** (String)
    **documentType** (String)
    **documentName** (String)
    **documentUrl** (String)

**users**: (Array)

**transactionId**: (Integer)

**deliveryDate**: (Timestamp)

**expiryDate**: (Timestamp)


### Table: services

**serviceId**: (String(unique))

**serviceName**: (String)

**serviceDisplayName**: (String)

**category**: (String)

**serviceType**: (String)

**description**: (Timestamp)

**contentLink**: (String)

**icon**: (Timestamp)

**users**: (Object)