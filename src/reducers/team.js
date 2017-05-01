const team = (state = 'Athens', action) => {
  switch (action.type) {
    case 'ADD_TEAM':
      return action.data;
    default:
      return state
  }
}

export default team;
