import styled from 'styled-components'


export const CommentContainer = styled.div`
    text-align:left;
    padding:20px 50px;

    .ant-pagination {
        margin-top:20px;
        text-align:center;
    }

    .ant-comment-inner{
        border-bottom: 1px solid #edebeb;
    }
    
    .ant-comment-actions{
        .reply{
            .ant-input,
            .ant-btn {
                padding:0;
                height:30px;
            }
            .ant-btn{
                width:80px;
                font-size:12px;
            }
            .ant-input::placeholder{
                font-size:12px;
                margin-left:10px;
            }
        }
    }

    .pageination{
        .ant-select-dropdown {
            width:100px !important;
        }
    }

`
