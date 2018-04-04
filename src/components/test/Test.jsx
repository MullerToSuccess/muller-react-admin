/**
 * Created by Muller on 2018/3/27.
 */
import React from 'react';
import {Row, Card} from 'antd';
// import EchartsViews from '../dashboard/EchartsViews';
import EchartsProjects from '../dashboard/EchartsProjects';
class Test extends React.Component {
    render() {
        return (
            <div style={{height: '100%','margin-top':100}}>
            <Row gutter={10}>
            <Card bordered={false} className={'no-padding'}>
            <EchartsProjects />
            </Card>
        </Row>
            </div>
        )

    }
}

export default Test;