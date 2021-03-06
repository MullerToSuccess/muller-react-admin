/**
 * Created by Muller on 2018/3/27.
 */
import React from 'react';
import {Row, Card, Button} from 'antd';
import {createStore} from 'redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
// import EchartsViews from '../dashboard/EchartsViews';
import EchartsProjects from '../dashboard/EchartsProjects';



const Counter = ({value, onIncrement, onDecrement, onMultip}) => (
    <div>
    <h1>{value}</h1>
    <Button onClick={onIncrement}>+</Button>
    <Button onClick={onDecrement}>-</Button>
    <Button onClick={onMultip}>*</Button>
    </div>
  );
const reducer  = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'MULTI5':
            console.log(state);
            return state * 5;
        default:
            return state;
    }
}
const store = createStore(reducer);//store 的两个参数：旧的state 和 action 

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    componentDidMount() {
        // componentDidMount 组件渲染完成，已经出现在dom文档里
        // render();
        store.subscribe(() => {
            this.setState({
                count: store.getState()
            })
        });
    }
    render() {
        return (
            <div style={{height: '100%'}}>
            <BreadcrumbCustom first="UI" second="Test" />
            <Row gutter={10}>
            <Card bordered={false} className={'no-padding'}>
            <EchartsProjects />
            <Counter
            value={this.state.count}
            onIncrement={() => store.dispatch({type: 'INCREMENT'})}
            onDecrement={() => store.dispatch({type: 'DECREMENT'})}
            onMultip={() => store.dispatch({type: 'MULTI5'})}
          />
            </Card>
        </Row>
            </div>
        )
    }
}

export default Test;