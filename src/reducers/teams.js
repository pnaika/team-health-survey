const teams = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        data: action.data
      };
    default:
      return state
  }
}

export default teams;
