export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const makeArray = obj => {
  let retArray = []
  for (let key in obj) {
    retArray.push({
      key: key,
      config: obj[key]
    })
  }
  return retArray
}

export const checkValid = (value, rules) => {
  if (rules.required) {
    if (value.trim() === '') {
      return false
    }
  }

  if (rules.min) {
    if (value.length < rules.min) {
      return false
    }
  }

  if (rules.max) {
    if (value.length > rules.max) {
      return false
    }
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(value)
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    return pattern.test(value)
  }

  return true
}
