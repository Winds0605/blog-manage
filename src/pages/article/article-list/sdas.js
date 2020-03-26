import React, { useState, useEffect } from 'react'
import { get, post } from 'utils/http'
import { MyIcon, formatDate } from 'utils/util'
import { ListContainer, StatusContainer, Title } from './style'
import { List, Tag, Button, Tabs, message, BackTop, Spin } from 'antd';


import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

const { TabPane } = Tabs;


const Status = ({ date, views, tag }) => {
    return (
        <StatusContainer>
            <span className="time"><MyIcon type="icon-time" />{formatDate(date, 'yyyy-MM-dd hh:mm:ss')}</span>
            <span className="views">阅读数：{views}</span>
            <Tag className="tag">{tag}</Tag>
        </StatusContainer>
    )
}



export default () => {

    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTatol] = useState(0)
    const [nowTag, setNowTag] = useState('All')
    const [tags, setTags] = useState([])
    let loadedRowsMap = {};

    const loadData = async (tag) => {
        try {
            setLoading(true)
            const articles = await post('/articles/findByPage', {
                page: 1,
                tag: tag || 'All'
            })
            const tags = await get('/tags/findAll')
            setLoading(false)
            setPage(1)
            setMovie(articles.data.data)
            setTatol(articles.data.total)
            setTags(['All', ...tags.data.data[0].tags])
        } catch (error) {
            throw error
        }
    }

    let handleInfiniteOnLoad = async ({ startIndex, stopIndex }) => {
        setLoading(true)
        for (let i = startIndex; i <= stopIndex; i++) {
            loadedRowsMap[i] = 1;
        }
        if (movie.length === total) {
            message.warning('没有更多数据了');
            setLoading(false)
            return;
        }
        const articles = await post('/articles/findByPage', {
            page: page + 1,
            tag: nowTag
        })

        let data = movie.concat(articles.data.data)
        setMovie(data)
    };

    let isRowLoaded = ({ index }) => !!loadedRowsMap[index];

    let renderItem = ({ index, key, style }) => {
        const item = movie[index];
        return (
            <List.Item
                key={key}
                style={style}
                actions={[
                    <Button>查看</Button>,
                    <Button>删除</Button>,
                    <Button>其他</Button>
                ]}
                extra={
                    <img
                        width={272}
                        height={200}
                        alt="logo"
                        src={item.banner}
                    />
                }>
                <List.Item.Meta
                    title={<Title>{item.title}</Title>}
                    description={<Status date={item.modifyOn} views={item.views} tag={item.tag} />}
                />
                {item.desc}
            </List.Item>
        );
    };


    // tab标签切换
    const handleTabsSwitch = (value) => {
        const tag = tags[value]
        loadData(tag)
        setNowTag(tag)
    }


    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
        <VList
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            overscanRowCount={2}
            rowCount={movie.length}
            rowHeight={250}
            rowRenderer={renderItem}
            onRowsRendered={onRowsRendered}
            scrollTop={scrollTop}
            width={width}
        />
    );

    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
        <AutoSizer disableHeight>
            {({ width }) =>
                vlist({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                    width,
                })
            }
        </AutoSizer>
    );

    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={handleInfiniteOnLoad}
            rowCount={movie.length}
        >
            {({ onRowsRendered }) =>
                autoSize({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                })
            }
        </InfiniteLoader>
    );

    useEffect(() => {
        loadData()
    }, [])

    return (
        <ListContainer>
            <Tabs defaultActiveKey="1" tabPosition={'top'} onChange={handleTabsSwitch} animated={false}>
                {tags.map((value, index) => (
                    <TabPane tab={value} key={index}>
                        <List itemLayout="vertical"
                            size="large">
                            {movie.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
                            {loading && <Spin className="demo-loading" />}
                        </List>
                    </TabPane>
                ))}
            </Tabs>
            <BackTop />
        </ListContainer>
    )
}

