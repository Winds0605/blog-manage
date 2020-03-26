import styled from 'styled-components'


export const ListContainer = styled.div`
    min-height:100%;
    .ant-pagination {
        text-align:center;
    }
    .ant-list-item{
        position:relative;
    }
    .ant-list-item-action{
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-105%);
    }

    .load-more{
        width:400px;
    }
    .ant-back-top{
        right:20px;
        bottom:10px;
    }
`

export const StatusContainer = styled.div`
    .time,
    .views,
    .tag {
        margin-right:20px;
        font-size:12px;
    }
`


export const Title = styled.span`
    font-size:25px;
    color:#222222;
`
