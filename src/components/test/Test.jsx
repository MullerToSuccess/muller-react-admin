/**
 * Created by Muller on 2018/3/27.
 */
import React from 'react';
import {Row, Card} from 'antd';
import {createStore} from 'redux';
import BreadcrumbCustom from '../BreadcrumbCustom';
// import EchartsViews from '../dashboard/EchartsViews';
import EchartsProjects from '../dashboard/EchartsProjects';



const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    </div>
  );
const reducer  = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
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
          />
            </Card>
        </Row>
            </div>
        )
    }
}

export default Test;