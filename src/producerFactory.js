const Producer = require('@mojaloop/central-services-stream').Kafka.Producer
const Logger = require('@mojaloop/central-services-logger')

const initProducer = async () => {
  Logger.info('testProducer::start')
  const config = {
    options:
    {
      pollIntervalMs: 10,
      messageCharset: 'utf8'
    },
    rdkafkaConf: {
      /* the config from original mojaloop helm charts 8.4.0 */
      'metadata.broker.list': 'perf-kafka:9092',
      'client.id': 'default-client',
      event_cb: true,
      dr_cb: false,
      'compression.codec': 'none',
      'socket.keepalive.enable': true,
      'queue.buffering.max.messages': 10000000,

      /* my config */
      // 'retry.backoff.ms': 100,
      // 'message.send.max.retries': 2,
      // 'queue.buffering.max.ms': 50,
      // 'batch.num.messages': 100,
      // 'api.version.request': true,
    },
    topicConf: {
      'request.required.acks': "all"
    }
  }

  const p = new Producer(config)
  Logger.info('testProducer::connect::start')
  const connectionResult = await p.connect()
  Logger.info('testProducer::connect::end')

  Logger.info(`Connected result=${connectionResult}`)

  return p
}

module.exports = {
  initProducer
}
