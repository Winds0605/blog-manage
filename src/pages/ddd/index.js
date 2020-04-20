import React from 'react'
import { Row, Col, Card } from 'antd'
import { Container } from './style'
import Count from 'react-countup'
import { MyIcon } from 'utils/util'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts"
const { Meta } = Card


export default () => {
    let count = [1379, 768, 192, 413];
    let imgSrc = ["icon-dianying", "icon-xiewenzhang", "icon-zhaopian", "icon-pinglun"];
    let imgName = ["Movie", "Article", "Photo", "Message"];
    const data = [
        {
            time: "10:10",
            call: 4,
            waiting: 2,
            people: 2
        },
        {
            time: "10:15",
            call: 2,
            waiting: 6,
            people: 3
        },
        {
            time: "10:20",
            call: 13,
            waiting: 2,
            people: 5
        },
        {
            time: "10:25",
            call: 9,
            waiting: 9,
            people: 1
        },
        {
            time: "10:30",
            call: 5,
            waiting: 2,
            people: 3
        },
        {
            time: "10:35",
            call: 8,
            waiting: 2,
            people: 1
        },
        {
            time: "10:40",
            call: 13,
            waiting: 1,
            people: 2
        }
    ];
    const scale = {
        call: {
            min: 0
        },
        people: {
            min: 0
        },
        waiting: {
            min: 0
        }
    };
    let chartIns = null;
    return (
        <Container>
            <Row gutter={16}>
                {
                    imgSrc.map(function (item, index) {
                        return (
                            <Col className="gutter-row" span={6} key={item}>
                                <Card style={{ cursor: 'pointer', marginBottom: 16 }}
                                    actions={[<MyIcon type="icon-xinxi" className="icon" />, <MyIcon type="icon-more" className="icon" />]}>
                                    <Meta
                                        style={{ fontSize: 22 }}
                                        avatar={<MyIcon type={imgSrc[index]} style={{ fontSize: '50px' }} />}
                                        title={imgName[index]}
                                        description={<Count start={0} end={count[index]} duration={2.75} />}
                                    />
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            <Row>
                <Col span={24} className="gutter-row">
                    <Chart
                        forceFit={true}
                        scale={scale}
                        data={data}
                        onGetG2Instance={chart => {
                            chartIns = chart;
                            chartIns.on('interval:mouseenter', e => {
                                chartIns.get('geoms').forEach(g => {
                                    if (g.get('type') === 'interval') {
                                        (g.getShapes() || []).forEach(s => {
                                            s.set('origin_fill', s.get('attrs').fill);
                                            s.attr('fill', 'red');
                                        });
                                    }
                                });
                            });
                            chartIns.on('interval:mouseleave', e => {
                                chartIns.get('geoms').forEach(g => {
                                    if (g.get('type') === 'interval') {
                                        (g.getShapes() || []).forEach(s => {
                                            s.attr('fill', s.get('origin_fill'));
                                        });
                                    }
                                });
                            });
                        }}
                    >
                        <Legend
                            custom={true}
                            allowAllCanceled={true}
                            items={[
                                {
                                    value: "waiting",
                                    marker: {
                                        symbol: "square",
                                        fill: "#3182bd",
                                        radius: 5
                                    }
                                },
                                {
                                    value: "people",
                                    marker: {
                                        symbol: "hyphen",
                                        stroke: "#ffae6b",
                                        radius: 5,
                                        lineWidth: 3
                                    }
                                }
                            ]}
                            onClick={ev => {
                                const item = ev.item;
                                const value = item.value;
                                const checked = ev.checked;
                                const geoms = chartIns.getAllGeoms();

                                for (let i = 0; i < geoms.length; i++) {
                                    const geom = geoms[i];

                                    if (geom.getYScale().field === value) {
                                        if (checked) {
                                            geom.show();
                                        } else {
                                            geom.hide();
                                        }
                                    }
                                }
                            }}
                        />
                        <Axis
                            name="people"
                            grid={null}
                            label={{
                                textStyle: {
                                    fill: "#fdae6b"
                                }
                            }}
                        />
                        <Tooltip />
                        <Geom type="interval" position="time*waiting" color="#3182bd" />
                        <Geom
                            type="line"
                            position="time*people"
                            color="#fdae6b"
                            size={3}
                            shape="smooth"
                        />
                        <Geom
                            type="point"
                            position="time*people"
                            color="#fdae6b"
                            size={4}
                            shape="circle"
                        />
                    </Chart>
                </Col>
            </Row>

        </Container>
    )
}
