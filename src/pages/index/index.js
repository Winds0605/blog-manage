import React from 'react'
import { Row, Col, Card, Divider, Table } from 'antd'
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
            time: "TypeScript",
            call: 4,
            increase: 2,
            views: 2
        },
        {
            time: "JavaScript",
            call: 2,
            increase: 6,
            views: 3
        },
        {
            time: "Sass",
            call: 13,
            increase: 2,
            views: 5
        },
        {
            time: "算法与数据结构",
            call: 9,
            increase: 9,
            views: 1
        },
        {
            time: "Python",
            call: 5,
            increase: 2,
            views: 3
        },
        {
            time: "前端",
            call: 8,
            increase: 2,
            views: 1
        },
        {
            time: "随记",
            call: 13,
            increase: 1,
            views: 2
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
    const columns = [
        {
            title: '留言者',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '留言时间',
            dataIndex: 'time',
            key: 'time',
            align: 'center'
        },
        {
            title: '留言内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center'
        }
    ];
    const data1 = [
        {
            name: 'John Brown',
            content: 'New York No. 1 Lake Park',
            time: '2019-9-1'
        },
        {
            name: 'John Brown',
            content: 'New York No. 1 Lake Park',
            time: '2019-9-1'
        },
        {
            name: 'John Brown',
            content: 'New York No. 1 Lake Park',
            time: '2019-9-1'
        },
        {
            name: 'John Brown',
            content: 'New York No. 1 Lake Park',
            time: '2019-9-1'
        },
        {
            name: 'John Brown',
            content: 'New York No. 1 Lake Park',
            time: '2019-9-1'
        },
    ];
    let chartIns = null;
    return (
        <Container>
            <Divider orientation="left">概况</Divider>
            <Row gutter={16} style={{ marginBottom: '30px' }}>
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
            <Divider orientation="left">文章阅读</Divider>
            <Row style={{ marginBottom: '30px' }}>
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
                                    value: "increase",
                                    marker: {
                                        symbol: "square",
                                        fill: "#3182bd",
                                        radius: 5
                                    }
                                },
                                {
                                    value: "views",
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
                            name="views"
                            grid={null}
                            label={{
                                textStyle: {
                                    fill: "#fdae6b"
                                }
                            }}
                        />
                        <Tooltip />
                        <Geom type="interval" position="time*increase" color="#3182bd" />
                        <Geom
                            type="line"
                            position="time*views"
                            color="#fdae6b"
                            size={3}
                            shape="smooth"
                        />
                        <Geom
                            type="point"
                            position="time*views"
                            color="#fdae6b"
                            size={4}
                            shape="circle"
                        />
                    </Chart>
                </Col>
            </Row>
            <Divider orientation="left">新增留言</Divider>
            <Table bordered columns={columns} dataSource={data1} pagination={false} style={{ marginBottom: '30px' }} />
        </Container>
    )
}
