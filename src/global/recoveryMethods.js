import Vue from 'vue'

export const recoveryMethods = {
  system: [],
  alternates: [],
}
export default recoveryMethods

export const add = async (email) => {
  const newMethod = await Vue.prototype.$API.post('method', {
    value: email
  })
  
  recoveryMethods.alternates.push(newMethod)
}

export const retrieve = async () => {
  clear()

  const all = await Vue.prototype.$API.get('method')

  recoveryMethods.system.push(...all.filter(m => m.type != 'email'))
  recoveryMethods.alternates.push(...all.filter(m => m.type == 'email'))
}

function clear() {
  recoveryMethods.system.splice(0)
  recoveryMethods.alternates.splice(0)
}

export const remove = async (id) => {
  await Vue.prototype.$API.delete(`method/${id}`)

  const i = recoveryMethods.alternates.findIndex(m => m.id == id)
  recoveryMethods.alternates.splice(i, 1)
}

export const verify = async (id, verificationCode = '') => {
  await Vue.prototype.$API.put(`method/${id}/verify`, {
    code: verificationCode
  })
}
