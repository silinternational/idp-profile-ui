import Vue from 'vue'

export const mfa = {
  totp: {},
  u2f: {},
  keys: {},
  backup: {},
  numVerified: 0
}
export default mfa

export const newKeyName = {
  _value: '',
  get: function () {
    return this._value
  },
  set: function (value) {
    this._value = value
  }
}

export const add = async (type) => await Vue.prototype.$API.post('mfa', { type })

export const verify = async (id, verification = '') => {
  const verifiedMfa = await Vue.prototype.$API.put(`mfa/${id}/verify`, {
    value: verification
  })

  mfa[verifiedMfa.type] = Object.assign({}, verifiedMfa)
}

export const retrieve = async () => {
  const all = await Vue.prototype.$API.get('mfa')

  mfa.totp = Object.assign({}, all.find(m => m.type === 'totp'))
  mfa.u2f = Object.assign({}, all.find(m => m.type === 'u2f'))
  mfa.keys = Object.assign({}, all.find(m => m.type === 'webauthn'))
  mfa.backup = Object.assign({}, all.find(m => m.type === 'backupcode'))
  
  mfa.numVerified = numOfVerifiedMfas(mfa) // currently, the api only returns verified mfas
}

function numOfVerifiedMfas(mfa) {
  let num = 0

  num += mfa.totp.id ? 1 : 0
  num += mfa.u2f.id || mfa.keys.data?.length || 0
  num += mfa.backup.id ? 1 : 0

  return num
}

export const remove = async (id) => {
  await Vue.prototype.$API.delete(`mfa/${id}`)

  const type = Object.keys(mfa).find(key => mfa[key].id === id)
  mfa[type] = {}
}

export const change = async (id, updates) => {
  return await Vue.prototype.$API.put(`mfa/${id}`, updates)
}

export const find = id => {
  const type = Object.keys(mfa).find(key => mfa[key].id == id)

  return mfa[type]
}

export const verifyWebauthn = async (id,  verification = '', label = '') => {
  const verifiedMfa = await Vue.prototype.$API.put(`mfa/${id}/verify/registration`, {
    value: verification,
    label: label,
  })
  mfa.keys = verifiedMfa
}

export const removeWebauthn = async (mfaId, webauthnId) => {
  const response = await Vue.prototype.$API.delete(`mfa/${mfaId}/webauthn/${webauthnId}`)
  const index = mfa.keys.data.findIndex(m => m.id === mfaId)
  if(index > -1) {
    mfa.keys.data.splice(index, 1)
  }
}

export const changeWebauthn = async (mfaId, webauthnId, updates) => {
  const response = await Vue.prototype.$API.put(`mfa/${mfaId}/webauthn/${webauthnId}`, updates)

  return response
}