
import { combineReducers } from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};//在receiveData的时候返回的action的data
        default:
            return {...state};
    }
};
//httpData是一个reducer：
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

const mReducer = (state = {text:"Hello"}, action) => {  
    switch (action.type) {  
        case type.changeTextAction:  
            return {  
                text: state.text ==='Hello' ? 'world':'Hello'  
            }  
        case type.buttonClickAction:  
            return {  
                text: 'Hello world'  
            }  
        default:  
            return {text:"Hello"};  
    }  
}  
//combineReducers把所有的reduce组合，现在只有一个httpData
export default combineReducers({
    httpData,
    mReducer
});
