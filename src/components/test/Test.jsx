/**
 * Created by Muller on 2018/3/27.
 */
import React from 'react';
import {Row, Col} from 'antd';
class Test extends React.Component {
    render() {
        return (
            <div style={{height: '100%'}}>
            <Row gutter={10}>
            <Col className="gutter-row" md={5}>
            1
            </Col>
            <Col className="gutter-row" md={5}>
            2
            </Col>
            <Col className="gutter-row" md={5}>
            3
            </Col>
            <Col className="gutter-row" md={5}>
            4
            </Col>
            <Col className="gutter-row" md={4}>
            5
            </Col>
        </Row>
            </div>
        )

    }
}

export default Test;