const cron = require('node-cron')
const mooyaho = require('./lib/mooyaho')

const inactiveChannelsMap = new Map()

async function clearEmptyChannels() {
  console.log('[schedule] Running clearEmptyChannels')
  const channels = await mooyaho.listAllChannels()
  const emptyChannels = channels.filter((channel) => channel.sessionCount === 0)

  // convert channels array to map
  const channelsMap = new Map()
  channels.forEach((channel) => {
    channelsMap.set(channel.id, channel)
  })

  const channelsToRemove = []
  emptyChannels.forEach((channel) => {
    // add to map if not existing
    if (!inactiveChannelsMap.has(channel.id)) {
      inactiveChannelsMap.set(channel.id, { channel, scheduledAt: new Date() })
      return
    }

    // remove from map if the channel is not currently empty
    const currentChannel = channelsMap.get(channel.id)
    if (currentChannel?.sessionCount !== 0) {
      inactiveChannelsMap.delete(channel.id)
    }

    // if channels is empty for more than 5 minutes, delete it
    const scheduledAt = inactiveChannelsMap.get(channel.id).scheduledAt
    const now = new Date()
    if (now - scheduledAt >= 1000 * 60 * 5) {
      channelsToRemove.push(channel.id)
      inactiveChannelsMap.delete(channel.id)
    }
  })

  if (channelsToRemove.length > 0) {
    await mooyaho.bulkDeleteChannels(channelsToRemove)
  }
  console.log(`[schedule] Removed ${channelsToRemove.length} empty channels`)
}

function setupSchedule() {
  // cron schedule every minute
  cron.schedule('* * * * *', clearEmptyChannels)
  console.log('[schedule] clearEmptyChannels schedule is registered.')
}

module.exports = setupSchedule
