import { combineReducers } from 'redux'
import teams from './teams';
import team from './team';
import attribute from './attribute';

const teamApp = combineReducers({
  teams,
  team,
  attribute,
})

export default teamApp;
