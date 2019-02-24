import Vue from 'vue'

export const mfa = {
  totp: {},
  u2f: {},
  backup: {},
  numVerified: 0
}
export default mfa

export const add = async (type) => await Vue.prototype.$API.post('mfa', { type })

export const verify = async (id, verification = '') => {
  await Vue.prototype.$API.put(`mfa/${id}/verify`, {
    value: verification
  })

  //TODO: made a request to have the api changed so the updated mfa would be returned so the local store, i.e., mfa, can be refreshed
  await retrieve()
}

export const retrieve = async () => {
  const all = await Vue.prototype.$API.get('mfa')

  mfa.totp = Object.assign({}, mfa.totp, all.filter(m => m.type === 'totp').pop()) // only interested in the last one, newest one, etc. until the api is tweaked to disallow multiples
  mfa.u2f = Object.assign({}, mfa.u2f, all.filter(m => m.type === 'u2f').pop())
  mfa.backup = Object.assign({}, mfa.backup, all.find(m => m.type === 'backupcode'))
  
  mfa.numVerified = numOfVerifiedMfas(mfa) // currently, the api only returns verified mfas
}

function numOfVerifiedMfas(mfa) {
  let num = 0

  num += mfa.totp.id ? 1 : 0
  num += mfa.u2f.id ? 1 : 0
  num += mfa.backup.id ? 1 : 0

  return num
}

export const remove = async (id) => {
  await Vue.prototype.$API.delete(`mfa/${id}`)
}

export const change = async (id, updates) => {
  return await Vue.prototype.$API.put(`mfa/${id}`, updates)
}
