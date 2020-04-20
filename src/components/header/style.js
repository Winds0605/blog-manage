import styled from 'styled-components'



export const Container = styled.div`
    position:fixed;
    height:70px;
    width:100%;
    margin:0 auto;
    top:0;
    line-height:70px;
    background-color:white;
    border-bottom:1px solid #DDDDDD;
    z-index:10;
`

export const Nav = styled.ul`
    float:right;
    height:100%;
    width:fit-content;
`

export const NavItem = styled.li`
    float:left;
    color:black;
    list-style:none;
    margin:0 20px;
    cursor:pointer;
    color:black;
    &:hover {
        text-decoration:underline
        color: black;
    }
`

export const Test = styled.div`
    height:800px;
    width:100%;
`

export const User = styled.div`
    width:fit-content;
    float:right;
    margin-right:20px;
`




