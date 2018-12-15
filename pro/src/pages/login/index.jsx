import React from 'react';
import { Button,TextInput,Box } from 'react-desktop/macOs';
import axios from 'axios';
import './index.css';

export default class Login extends React.Component {

  state={
    name : '',
    psw  : ''
  }

  inputName(e){
    this.setState({
      name : e.target.value
    })
  }

  inputPsw(e){
    this.setState({
      psw : e.target.value
    })
  }

  async onSubmit(){
    if( this.state.name && this.state.psw ){
      let res = axios({
    method: 'post',
    url:'https://iicxiy-8084-kcnkdk.dev.ide.live/api/auth/login',
    params: this.state})
    console.log(res,'res')
      // let { data } = await axios.get('https://iicxiy-8084-kcnkdk.dev.ide.live/api/auth/user', this.state);
      // console.log(data)
    }else{
      alert('请输入完整信息');
      return;
    } 
  }
  
  render(){
    return(
      <div className="login-bar" >
      <Box background="#D2B48C" padding="20px 30px">
        <TextInput
        label="用户名"
        placeholder="请输入用户名"
        onChange={this.inputName.bind(this)}
        />
        <br/>
        <TextInput
        label="密码"
        placeholder="请输入密码"
        onChange={this.inputPsw.bind(this)}
        />
        <br/>
        <Button color="blue" onClick={this.onSubmit.bind(this)}>
          登 录
        </Button>
      </Box>
        
      </div>
       
    )
    
  }
}