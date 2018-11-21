import React from 'react';
import ajax from 'axios';
import './index.css';


class DetailPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title : '', 
            sHTML : ''
        };
      }

    componentDidMount(){
        ajax.post('/page/knowledge/kmContent', {id : this.props.match.params.id}).then(res => {
            console.log('内容：',res.data.data)
            this.setState({
                title : res.data.data.Title,
                sHTML : res.data.data.Content
            })
        })
    }


    render(){
        
        return(
            <div>

                <div className = 'card-title'>
                    {this.state.title}
                </div>
                <div className = 'card-main'>
                <div style = {{width:'100%'}}  dangerouslySetInnerHTML = {{ __html:this.state.sHTML }}></div>,
                </div>
                
            </div>
        )
    }
}

export default DetailPage;