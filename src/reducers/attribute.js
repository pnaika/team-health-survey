const attribute = (state = 'fun', action) => {
  switch (action.type) {
    case 'ADD_ATTRIBUTE':
      return action.data;
    default:
      return state
  }
}

export default attribute;
