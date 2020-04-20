import React from 'react'
import { Menu } from 'antd';
import { SiderContainer } from './style'
import { MyIcon } from 'utils/util'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;




export default () => {

    return (
        <SiderContainer>
            <Menu
                style={{ width: 250 }}
                mode="inline"
            >
                <Menu.Item key="1"><Link to="/home"><MyIcon type="icon-liebiao" />首页</Link></Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <MyIcon type="icon--article" />
                            <span>文章管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="2"><Link to="/home/article-list"><MyIcon type="icon-liebiao" />文章列表</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={"/home/article-add"}><MyIcon type="icon-tianjia" />添加文章</Link></Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <MyIcon type="icon-weidianying" />
                            <span>电影管理</span>
                        </span>
                    }
                >
                    <Menu.Item key="4"><Link to="/home/movie-list"><MyIcon type="icon-liebiao" />电影列表</Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/home/movie-add"><MyIcon type="icon-tianjia" />添加电影</Link></Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <MyIcon type="icon-qita2" />
                            <span>其他管理</span>
                        </span>
                    }
                >
                    <SubMenu key="sub3" title={
                        <span>
                            <MyIcon type="icon-tag" />
                            <span>标签管理</span>
                        </span>
                    }
                    >
                        <Menu.Item key="6"><Link to="/home/article-tag"><MyIcon type="icon-biaoqian" />文章标签管理</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/home/movie-tag"><MyIcon type="icon-biaoqian" />电影标签管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="8"><Link to="/home/message"><MyIcon type="icon-pinglun" />留言管理</Link></Menu.Item>
                    <Menu.Item key="9"><Link to="/home/photo"><MyIcon type="icon-photo" />照片管理</Link></Menu.Item>
                </SubMenu>
            </Menu>
        </SiderContainer>
    );
}
