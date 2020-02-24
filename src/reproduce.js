'use strict'

const Consumer = require('@mojaloop/central-services-stream').Kafka.Consumer
const ConsumerEnums = require('@mojaloop/central-services-stream').Kafka.Consumer.ENUMS
const Logger = require('@mojaloop/central-services-logger')
const base64url = require('base64url')
const { initProducer } = require('./producerFactory')
const { SeriesTool } = require('./seriesTool')

const consumeSendToReceivedSerie = new SeriesTool('sentToReceived')
const consumeReceivedAllSerie = new SeriesTool('receivedAll')

//const listenOnTopic = 'topic-transfer-prepare'
//const listenOnTopic = 'topic-notification-event'
const listenOnTopic = process.env.CONSUME_TOPIC || 'testA'
let produceToTopic = 'testB'

let tick = 0
let sendToRcvDelayAcc = 0
let sendToRcvDelayCnt = 0

let kafkaProducer = null

const stats = {
  msgPassed: 0,
  passingToTopic: ''
}
const logStats = () => {
  console.log(`passed ${stats.msgPassed} messages to ${stats.passingToTopic}`)
  stats.msgPassed = 0
  setTimeout(logStats, 1000)
}

setTimeout(logStats, 1000)

const consumeMsg = async (messageToPass) => {
  const now = (new Date()).getTime()

  if (messageToPass.value.content.sendToArray) {
    const newProduceToTopic = messageToPass.value.content.sendToArray.shift()
    if (produceToTopic !== newProduceToTopic) {
      produceToTopic = newProduceToTopic
      stats.passingToTopic = produceToTopic
      console.log(`changed produce target topic to ${produceToTopic}`)
    }
  }
  const producerTopicConf = {
    topicName: produceToTopic
  }

  await kafkaProducer.sendMessage(messageToPass.value, producerTopicConf).then(results => {
    stats.msgPassed++
    //Logger.info(`REProducer.sendMessage:: result:'${JSON.stringify(results)}'`)
  })
}

const testReproduce = async () => {
  console.log(`Gonna listen to topic ${listenOnTopic} and reproduce to topic ${produceToTopic}`)

  console.log('Instantiate producer')
  kafkaProducer = await initProducer()

  console.log('Instantiate consumer on topic', listenOnTopic)

  const c = new Consumer([listenOnTopic], {
    options: {
      /* the config from original mojaloop helm charts 8.4.0 */
      mode: ConsumerEnums.CONSUMER_MODES.recursive,
      batchSize: 1,
      pollFrequency: 10,
      recursiveTimeout: 100,
      messageCharset: 'utf8',
      messageAsJSON: true,
      sync: true,
      consumeTimeout: 1000,

      /* my config */
      consumeTimeout: 500
    },
    rdkafkaConf: {
      /* the config from original mojaloop helm charts 8.4.0 */
      'group.id': 'kafka',
      //'metadata.broker.list': 'localhost:9092',
      'metadata.broker.list': 'perf-kafka:9092',
      "socket.keepalive.enable": true

      /* my config */
      //'enable.auto.commit': false
    },
    topicConf: {
      "auto.offset.reset": "earliest"
    },
    logger: Logger
  })

  console.log('Connect consumer')
  const connectionResult = await c.connect()

  console.log(`Connected result=${connectionResult}`)

  c.consume((error, message) => {
    return new Promise((resolve, reject) => {
      if (error) {
        console.log(`WTDSDSD!!! error ${error}`)
        // resolve(false)
        reject(error)
      }
      if (message) { // check if there is a valid message coming back
        // lets check if we have received a batch of messages or single. This is dependant on the Consumer Mode
        if (Array.isArray(message) && message.length != null && message.length > 0) {
          message.forEach(msg => {
            consumeMsg(msg)
            c.commitMessage(msg)
          })
        } else {
          consumeMsg(message)
          c.commitMessage(message)
        }
        resolve(true)
      } else {
        resolve(false)
      }
      // resolve(true)
    })
  })

  // consume 'ready' event
  c.on('ready', arg => console.log(`onReady: ${JSON.stringify(arg)}`))
  // consume 'batch' event
  c.on('batch', message => console.log(`onBatch: ${JSON.stringify(message)}`))

  console.log('testReproduce::end')
}

testReproduce()
