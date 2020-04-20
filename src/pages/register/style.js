import styled from 'styled-components'

export const LoginContainer = styled.div`
    margin: 0;
    padding: 0;
    height:100%;
    font-family: sans-serif;
    background: #34495e;
`

export const Box = styled.div`
    width: 350px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #191919;
    text-align: center;

    h1 {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
    }

    .password,
    .password:hover {
        box-shadow:none;
        background:none;
    }
    
    .form-item{
        margin-bottom:5px;
    }

    .anticon{
        color:white;
    }

    .username,
    .password > input {
        box-shadow:none;
        background:none;
        margin:5px auto;

        &:hover{
            background:none;
        }

        &:focus{
            box-shadow:none;
            background:none;
            width:230px;
            border:2px solid #39CB75;
        }
        ::placeholder{
            color:#747474;
            font-size:12px;
        }
        border: 0;
        background: none;
        display: block;
        text-align: center;
        border: 2px solid #3498db;
        padding: 14px 10px;
        width: 200px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
    }

    .ant-input-suffix {
        position:absolute;
        color:white;
        right:0;
    }

    .ant-input-password {
        border:none;
    }

    .submit{
        display: block;
        background: none;
        margin: 20px auto;
        padding: 10px 40px;
        height: 40px;
        font-weight: 600;
        text-align: center;
        border: 2px solid #3498db;
        outline: none;
        color: white;
        border-radius: 24px;
        -webkit-transition: 0.25s;
        transition: 0.25s;
        cursor: pointer;
        -webkit-text-decoration: none;
        text-decoration: none;
        font-size: 12px;
    }
`

export const Text = styled.p`
    position: absolute;
    right: 20px;
    bottom: 0;
    color: #DDDDDD;
    font-size: 12px;
    b   {
        text-decoration: underline;
        color:white;
        cursor:pointer;
    }
`

