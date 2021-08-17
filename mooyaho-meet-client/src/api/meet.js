import client from './client'

/**
 * Type of meet object
 * @typedef {Object} Meet
 * @property {number} id
 * @property {string} channelId
 * @property {string} code
 */

/**
 * @param {string} code
 * @returns {Promise<Meet>}
 * */
export async function createMeet(code) {
  const { data } = await client.post('/meet', { code })
  return data
}

/**
 * @param {string} code
 * @returns {Promise<Meet>}
 * */
export async function getMeet(code) {
  const { data } = await client.get(`/meet/${code}`)
  return data
}
