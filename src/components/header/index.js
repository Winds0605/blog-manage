import React from 'react'
// import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { Nav, Container, NavItem } from './style'
import Heart from '../heart/index'

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1597339_8qf8urtamts.js',
// });



export default () => {
    return (
        <Container>
            <Heart></Heart>
            {/* <IconFont type="icon-Wind" style={{ fontSize: '35px', margin: '0 10px', float: 'left', lineHeight: '70px' }} /> */}
            <Nav>
                <Link to="/home"><NavItem>Home</NavItem></Link>
                <Link to="/blog"><NavItem>Blog</NavItem></Link>
                <Link to="/movie"><NavItem>Movies</NavItem></Link>
            </Nav>
        </Container>
    )
}
