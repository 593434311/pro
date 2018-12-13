import React,{Component} from 'react';
import { TextInput } from 'react-desktop/windows';

export default class Register extends Component{
    render(){
        return(
            <div>
                用户名:<TextInput
                ref="input"
                theme={this.props.theme}
                color={this.props.color}
                background
                label="My Input"
                placeholder="My Input"
                onChange={this.handleChange}
                />
            </div>
        )
    }
}