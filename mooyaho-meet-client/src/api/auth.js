import client from './client'

/**
 * Integrates Guest User
 * @param {string} sessionId
 * @param {string} displayName
 * @returns {Promise<any>}
 * */
export async function integrateGuest(sessionId, displayName) {
  const { data } = await client.post('/auth/integrate-guest', {
    sessionId,
    displayName,
  })
  return data
}
