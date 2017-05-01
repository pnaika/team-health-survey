/*
 * action types
 */

export const ADD_DATA = 'ADD_DATA'
export const ADD_TEAM = 'ADD_TEAM'
export const ADD_ATTRIBUTE = 'ADD_ATTRIBUTE'

/*
 * action creators
 */

export function addData(data) {
  return {
    type: ADD_DATA,
    data
  }
}

export function addTeam(data) {
  return {
    type: ADD_TEAM,
    data
  }
}

export function addAttribute(data) {
  return {
    type: ADD_ATTRIBUTE,
    data
  }
}