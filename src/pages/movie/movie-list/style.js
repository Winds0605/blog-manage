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

export const StatusContainer = styled.div`
    display: flex;
    width: 70%;
    margin: 0 auto;

    .desc,
    .other {
        flex:1;
        text-align:left;
        padding:0px 20px;
    }

    .other  {
        line-height: 2.5;
        border-right:1px solid #ededed;
    }

    .desc {
        div{
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
        }
    }

    .time,
    .views,
    .tag {
        margin-right:20px;
        font-size:12px;
    }
`

export const StatusItem = styled.div`

`


export const Title = styled.span`
    font-size:25px;
    color:#222222;
`
