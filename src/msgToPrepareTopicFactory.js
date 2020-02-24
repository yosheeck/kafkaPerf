const uuid = require('uuid')
const base64url = require('base64url')

const topicName = 'topic-transfer-prepare'

const encodePayload = (input) => {
  return `data:application/vnd.interoperability.transfers+json;base64,${base64url(Buffer.from(input), 'utf8')}`
}

const generatePayload = (testData) => {
  return {
    testData,
    "transferId": uuid.v4(),
    "payerFsp": "payerfsp",
    "payeeFsp": "payeefsp",
    "amount": {
      "amount": "1.11",
      "currency": "USD"
    },
    "expiration": new Date(new Date().getTime() + 600000),
    "ilpPacket": "AQAAAAAAAADIEHByaXZhdGUucGF5ZWVmc3CCAiB7InRyYW5zYWN0aW9uSWQiOiIyZGY3NzRlMi1mMWRiLTRmZjctYTQ5NS0yZGRkMzdhZjdjMmMiLCJxdW90ZUlkIjoiMDNhNjA1NTAtNmYyZi00NTU2LThlMDQtMDcwM2UzOWI4N2ZmIiwicGF5ZWUiOnsicGFydHlJZEluZm8iOnsicGFydHlJZFR5cGUiOiJNU0lTRE4iLCJwYXJ0eUlkZW50aWZpZXIiOiIyNzcxMzgwMzkxMyIsImZzcElkIjoicGF5ZWVmc3AifSwicGVyc29uYWxJbmZvIjp7ImNvbXBsZXhOYW1lIjp7fX19LCJwYXllciI6eyJwYXJ0eUlkSW5mbyI6eyJwYXJ0eUlkVHlwZSI6Ik1TSVNETiIsInBhcnR5SWRlbnRpZmllciI6IjI3NzEzODAzOTExIiwiZnNwSWQiOiJwYXllcmZzcCJ9LCJwZXJzb25hbEluZm8iOnsiY29tcGxleE5hbWUiOnt9fX0sImFtb3VudCI6eyJjdXJyZW5jeSI6IlVTRCIsImFtb3VudCI6IjIwMCJ9LCJ0cmFuc2FjdGlvblR5cGUiOnsic2NlbmFyaW8iOiJERVBPU0lUIiwic3ViU2NlbmFyaW8iOiJERVBPU0lUIiwiaW5pdGlhdG9yIjoiUEFZRVIiLCJpbml0aWF0b3JUeXBlIjoiQ09OU1VNRVIiLCJyZWZ1bmRJbmZvIjp7fX19",
    "condition": "HOr22-H3AfTDHrSkPjJtVPRdKouuMkDXTR4ejlQa8Ks"
  }
}

const template = {
   "from": "payerfsp",
   "to": "payeefsp",
   "id": "d45ca001-be36-4a01-88eb-c6d305506c0e",
   "content": {
    "uriParams": {
     "id": "d45ca001-be36-4a01-88eb-c6d305506c0e"
    },
    "headers": {
     "accept": "application/vnd.interoperability.transfers+json;version=1",
     "content-type": "application/vnd.interoperability.transfers+json;version=1.0",
     "date": "2020-02-21T11:28:45.000Z",
     "fspiop-source": "payerfsp",
     "fspiop-destination": "payeefsp",
     "fspiop-signature": "{\"signature\":\"iU4GBXSfY8twZMj1zXX1CTe3LDO8Zvgui53icrriBxCUF_wltQmnjgWLWI4ZUEueVeOeTbDPBZazpBWYvBYpl5WJSUoXi14nVlangcsmu2vYkQUPmHtjOW-yb2ng6_aPfwd7oHLWrWzcsjTF-S4dW7GZRPHEbY_qCOhEwmmMOnE1FWF1OLvP0dM0r4y7FlnrZNhmuVIFhk_pMbEC44rtQmMFv4pm4EVGqmIm3eyXz0GkX8q_O1kGBoyIeV_P6RRcZ0nL6YUVMhPFSLJo6CIhL2zPm54Qdl2nVzDFWn_shVyV0Cl5vpcMJxJ--O_Zcbmpv6lxqDdygTC782Ob3CNMvg\\\",\\\"protectedHeader\\\":\\\"eyJhbGciOiJSUzI1NiIsIkZTUElPUC1VUkkiOiIvdHJhbnNmZXJzIiwiRlNQSU9QLUhUVFAtTWV0aG9kIjoiUE9TVCIsIkZTUElPUC1Tb3VyY2UiOiJPTUwiLCJGU1BJT1AtRGVzdGluYXRpb24iOiJNVE5Nb2JpbGVNb25leSIsIkRhdGUiOiIifQ\"}",
     "fspiop-uri": "/transfers",
     "fspiop-http-method": "POST",
     "content-length": 1062
    },
    "payload": ''
   },
   "type": "application/json",
   "metadata": {
    "correlationId": "d45ca001-be36-4a01-88eb-c6d305506c0e",
    "event": {
     "type": "position",
     "action": "prepare",
     "createdAt": "2020-02-21T11:28:45.129Z",
     "state": {
      "status": "success",
      "code": 0,
      "description": "action successful"
     },
     "id": "d4101e4b-0cad-4050-862f-0067bdb74993"
    },
    "trace": {
     "startTimestamp": "2020-02-21T11:28:45.132Z",
     "service": "cl_transfer_prepare",
     "traceId": "9a90672f1d257fe0d146429c1385048b",
     "spanId": "3118e99fa871f074",
     "parentSpanId": "8e9f2b205dea177d",
     "tags": {
      "tracestate": "acmevendor=3118e99fa871f074",
      "transactionType": "transfer",
      "transactionAction": "prepare",
      "transactionId": "d45ca001-be36-4a01-88eb-c6d305506c0e",
      "source": "payerfsp",
      "destination": "payeefsp",
      "payerFsp": "payerfsp",
      "payeeFsp": "payeefsp"
     }
    },
    "protocol.createdAt": 1582284525169
   }
}

const getNewMsg = (testData) => {
  const msg = template
  msg.content.payload = encodePayload(JSON.stringify(generatePayload(testData)))

  return msg
}

module.exports = {
  getNewMsg,
  topicName
}