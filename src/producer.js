/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Lazola Lucas <lazola.lucas@modusbox.com>
 * Rajiv Mothilal <rajiv.mothilal@modusbox.com>
 * Miguel de Barros <miguel.debarros@modusbox.com>

 --------------
 ******/

/**
 * Kafka Producer
 * @module Producer
 */
// TODO: TO BE REWORKED INTO UNIT/INTEGRATION TEST FRAMEWORK

'use strict'

const Logger = require('@mojaloop/central-services-logger')
const MsgToPrepareTopicFactory = require('./msgToPrepareTopicFactory')
const MsgDumbFactory = require('./msgDumbFactory')

const { initProducer } = require('./producerFactory')

const msgFactory = MsgDumbFactory
//const msgFactory = MsgToPrepareTopicFactory

const sendToArray = [
  'testA',
  'testB',
  'testC',
  'testD',
  'testE',
  'testF',
  'testG',
  'testEnd']
msgFactory.topicName = sendToArray.shift()

const msgCnt = 100
let tick = 0

const sendOneMessage = async (kafkaProducer, topicConf, msgIdx) => {
  const time = (new Date()).getTime()
  for (let batchMsgIdx = 0; batchMsgIdx < 1; batchMsgIdx++) {
    msgIdx++
    const messageToSend = msgFactory.getNewMsg({
        msgIdx,
        time,
        sendToArray
      })
    Logger.info(`sendOneMessage idx=${msgIdx}`)
    try {
      await kafkaProducer.sendMessage(messageToSend, topicConf).then(results => {
        Logger.info(`testProducer.sendMessage:: result:'${JSON.stringify(results)}'`)
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (msgIdx < msgCnt) {
    setImmediate(() => {
        sendOneMessage(kafkaProducer, topicConf, msgIdx)
      }
    )
  } else {
    const toe = (new Date()).getTime()
    console.log(`Finished sending ${msgCnt} messages in ${toe-tick} ms`)
  }
}

const runSending = async () => {
  const kafkaProducer = await initProducer()

  const topicConf = {
    topicName: msgFactory.topicName
  }
  sendOneMessage(kafkaProducer, topicConf, 0)
}

runSending()

