import styled from 'styled-components'

export const Container = styled.div`
    width:40%;
    padding:30px;
    .btn {
        text-align:left;
        padding:5px 0px;
        .ant-btn{
            margin-right:5px;
        }
        .ant-btn:nth-of-type(2){
            border:1px dashed #FD4F54;
        }
    }
`

export const TagContainer = styled.div`
    border:1px solid #ededed;
    text-align:left;
    padding:16px 24px;
`
