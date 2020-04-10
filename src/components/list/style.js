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
    .ant-list-item {
        padding-left:20px;
        padding-right:20px;
    }
    .ant-pagination.mini{
        padding: 30px 0;
        border-top: 1px solid #DDDDDD;
    }
`
