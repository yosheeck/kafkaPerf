const topicName = 'test'

const getNewMsg = ({msgIdx, time}) => {
    const msg = {
      content: {
        msgIdx,
        time,
        x: '1'.repeat(3000)
      }
    }

    return msg
  }

  module.exports = {
    getNewMsg,
    topicName
  }