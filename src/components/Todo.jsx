import React, { Component } from 'react'; 
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';  
import { withRouter } from 'react-router-dom';

import { changeTextAction, buttonClickAction } from '../action';
//定义组件  
class Todo extends Component{  
    render() { 
        //this.props就行我们的map的state和dispatch中获得了全局的store中的状态： 
        const {text, onChangeText, onButtonClick} = this.props;  
        console.log(111,this.props);
        return (  
            <div> 
                <h1 onClick={ onChangeText }> {text} </h1>  
                <button onClick={ onButtonClick }>click me</button>  
            </div>  
        );  
    }  
}  
  

const mapStateToProps = state => {
    const { text } = state.mReducer;
    return { text };
};
const mapDispatchToProps = dispatch => ({
    onButtonClick:bindActionCreators(buttonClickAction, dispatch),  
    onChangeText:bindActionCreators(changeTextAction,dispatch) 
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Todo));