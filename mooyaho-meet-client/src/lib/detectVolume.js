// class SoundMeter {
//   script = null
//   context = null

//   constructor() {
//     const context = new AudioContext()
//     const script = context.createScriptProcessor(2048, 1, 1)
//     script.addEventListener('audioprocess', (e) => {
//       const input = e.inputBuffer.getChannelData(0)
//       const sum = input.reduce((a, b) => a + b)
//       const average = sum / input.length
//       console.log(average)
//     })

//   }

//   setStream(stream) {

//   }
//   setCallback() {}
//   start() {}
//   stop() {}
// }

/**
 * @param {MediaStream} stream
 * @param {Function} callback
 * @param {Function} callback
 * @returns {Function}
 */
export function detectVolume(stream, callback, muteCallback) {
  if (!stream) {
    return () => {}
  }

  let muted = false
  let muteCounter = 0

  const context = new AudioContext()
  const script = context.createScriptProcessor(2048, 1, 1)
  const source = context.createMediaStreamSource(stream)
  source.connect(script)
  script.connect(context.destination)

  /**
   * @param {AudioProcessingEvent} e
   * */
  const onAudioProcess = (e) => {
    const input = e.inputBuffer.getChannelData(0)
    const sum = input.reduce((a, b) => a + b * b, 0)
    const average = Math.sqrt(sum / input.length)
    callback(average)
    if (!muted) {
      if (average < 0.00015) {
        muteCounter += 1
        if (muteCounter > 5) {
          muted = true
          muteCallback(true)
          muteCounter = 0
        }
      } else {
        muteCounter = 0
      }
    } else {
      if (average > 0.00015) {
        muted = false
        muteCallback(false)
      }
    }
  }

  script.addEventListener('audioprocess', onAudioProcess)

  const unsubscribe = () => {
    script.removeEventListener('audioprocess', onAudioProcess)
  }
  return unsubscribe
}
