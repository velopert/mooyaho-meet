/**
 * @typedef {Object} Session
 * @property {string} id
 * @property {any} user
 * @property {MediaStream | null} stream
 */

import { useEffect } from 'react'
import { detectVolume } from '../lib/detectVolume'

/**
 *
 * @param {Session[]} sessions
 */
export function useDetectVolume(sessions) {
  useEffect(() => {
    const unsubscribeFunctions = sessions.map((s) =>
      detectVolume(
        s.stream,
        () => {},
        (muted) => {
          console.log(muted ? 'muted' : 'unmuted')
        }
      )
    )
    return () => {
      unsubscribeFunctions.forEach((f) => f())
    }
  }, [sessions])
}
