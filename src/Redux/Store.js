import rootReducer from "./Combine";

import { createStore } from 'redux';

const store = createStore(rootReducer);

export default store;