import EditForm from '../../componets/editform/index';
import React from 'react';
import axios from 'axios';
import {Modal, NavBar, Toast, Button, WhiteSpace, SearchBar} from 'antd-mobile';
import Scroll from '../../componets/scrollbar/index';
import ItemBar from '../../componets/itembar/index';




class Kc extends React.Component{



    state={
        title   : '',
        sub     : [],
        data    : [],
        oldsub  : [],
        dataid  : ''
    }

    formConfig = {
        fields: [
            {type: 'group', text: ''},
        ]
    }

    tabdata = []


    componentDidMount(){
        axios.post('/page/knowledge/kmClass').then(
            res => {
                if(res.data.result == 'OK'){
                    if(res.data.data.kmClass.length == 0){
                        Toast.info('暂无数据');
                        return;
                    }

                    let kclass = [];

                    kclass = res.data.data.kmClass[0].name ? res.data.data.kmClass : [];
                    this.formConfig.fields[0].text = kclass[0].name ? kclass[0].name : [];
                    this.tabdata.push(kclass[0]);

                    this.setState({
                        title : kclass[0].name,
                        sub   : res.data.data.kmItem,
                        data  : kclass,
                        oldsub  : res.data.data.kmItem,
                        dataid  : kclass[0].id
                    });
                }
                
            }
        ).catch(err => {
            alert(err)
        });

        
        
        
    }

    onJump(url){
        this.props.history.push(url);
    }

    //改变标题
    onTitle(data){

        axios.post('/page/knowledge/kmItem',{id : data.id}).then(
            res => {

                if(res.data.result == 'OK'){
                    this.setState({
                        sub     : res.data.data.kmItem,
                        oldsub  : res.data.data.kmItem,
                        dataid  : data.id
                    });
                }
                
            }
        ).catch(err => {
            alert(err)
        });

        this.tabdata = [];
        this.tabdata.push(data);
        this.formConfig.fields[0].text = data.name;

        this.setState({
            title : data.name,
            sub   : data.sub ? data.sub : []
        })
    }


    //改变数据
    changeData(id,name){
        axios.post('/page/knowledge/kmItem',{id : id}).then(
            res => {
                if(res.data.result == 'OK'){

                    this.tabdata.push({id : id, name: name});

                    this.setState({
                        sub   : res.data.data.kmItem,
                        dataid: id,
                    });
                }
            }
        ).catch(err => {
            alert(err)
        });
    }


    //点击导航历史
    hundleReturn(id,name){
        let tab = [];
        axios.post('/page/knowledge/kmItem',{id : id}).then(
            res => {
                
                if(res.data.result == 'OK'){
                    for(let i=0; i<this.tabdata.length; i++){
                        tab.push(this.tabdata[i]);
                        if(this.tabdata[i].id == id){
                            break;
                        }
                    }

                    this.tabdata = tab;

                    this.setState({
                        sub   : res.data.data.kmItem,
                        dataid: id
                    });
                }
                
            }
        ).catch(err => {
            alert(err)
        });
    }

    //查询递归
    filter(item,val,arr){
            if(item.name){

                if(item.name.indexOf(val) != -1){
                    arr.push(item);
                }

                if(item.kmItem){
                    for(let i = 0; i<item.kmItem.length; i++){
                        this.filter(item.kmItem[i],val,arr)
                    } 
                }
            }
                        
    }
         
    

    //查询
    Search(val){

        axios.post('/page/knowledge/kmItem',{id : this.state.dataid}).then(
            res => {
                if(res.data.result == 'OK'){
                    if(val.length == 0){
                        this.setState({
                            sub : res.data.data.kmItem
                        })
                    }else{
                        let searched =[];
                        res.data.data.kmItem.map( (item) => {
                            this.filter(item,val,searched)
                        })
                        this.setState({
                            sub : searched
                        })  
                    }
                    
                    
                }
            }
        )

    }
    
    render(){
        return(
            <div>
                <NavBar className='bar-head'>知识中心</NavBar>
                <Scroll data={this.state.data}  onTitle={this.onTitle.bind(this)} />
                <EditForm frame={this.formConfig}></EditForm>
                <SearchBar placeholder="请输入查询内容" onChange={this.Search.bind(this)} onSubmit={this.Search.bind(this)} />
                <ItemBar hundleReturn={this.hundleReturn.bind(this)} tabdata={this.tabdata} changeData={this.changeData.bind(this)} data={this.state.sub} onJump={this.onJump.bind(this)} />
           </div>

        );
    }

}

export default Kc;