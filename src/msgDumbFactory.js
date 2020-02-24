const topicName = 'test'

const getNewMsg = ({msgIdx, time, sendToArray}) => {
    const msg = {
      content: {
        msgIdx,
        time,
        x: '1'.repeat(3000),
        sendToArray
      }
    }

    return msg
  }

  module.exports = {
    getNewMsg,
    topicName
  }