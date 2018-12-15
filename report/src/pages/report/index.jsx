import React, { Component } from 'react';
import { Popconfirm, Switch, message, Table, Card, Select, Button, DatePicker, Modal } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './index.css?v=2';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');




const { RangePicker } = DatePicker;
const Option = Select.Option;

const titlebar = [{
    title: '序号',
    width:200,
    dataIndex: 'No'
  },{
    title: '客户名称（重要客户）',
    dataIndex: 'ClientName',
    width:200,
  }, {
    title: '总故障件数',
    dataIndex: 'Total',
    width:200,
  }, {
    title: '保内故障件数',
    dataIndex: 'baoFaultCount',
    width:200,
  }, {
    title: '保内收费件数',
    dataIndex: 'baoChargeCount',
    width:200,
}];

const stitlebar = [{
        title: '产品系列',
        width:200,
        dataIndex: 'series'
      },
      {
        title: '故障件数(保内)',
        width:200,
        dataIndex: 'faultin'
      },
      {
        title: '故障件数(保外)',
        width:200,
        dataIndex: 'faultout'
      }
]

class Report extends Component {

    state = {
        usertype    : '',
        type        : '',
        mode        : ['month', 'month'],
        value       : [],
        tabledata   : [],
        stabledata  : [],
        visible     : false
    }



    componentDidMount() {


        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        var myChart2 = echarts.init(document.getElementById('main2'));
        // 绘制图表
        myChart.setOption(
            {

                tooltip: {
                    trigger: 'axis',
                    show: true
                },
                legend: {
                    data:['社占比','件占比','保内件数占比','保内收费件数占比','平均纳期天数']
                },

                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07']
                },
                yAxis: [{
                    name: '占比',
                    nameLocation: 'end',
                    type: 'value',
                    inverse: false
                },
                {
                        name: '平均纳期天数',
                        nameLocation: 'end',
                        type: 'value',
                        inverse: false
                    }

                ],
                series: [
                    {
                        name:'社占比',
                        type:'line',
                        data:[10, 22, 30, 40, 50, 60, 70]
                    },
                    {
                        name:'件占比',
                        type:'line',
                        data:[20, 32, 41, 54, 60, 70, 80]
                    },
                    {
                        name:'保内件数占比',
                        type:'line',
                        data:[30, 42, 50, 64, 70, 80, 90]
                    },
                    {
                        name:'保内收费件数占比',
                        type:'line',
                        data:[40, 53, 60, 73, 89, 93, 100]
                    },
                    {
                        name:'平均纳期天数',
                        type:'line',
                        yAxisIndex:1,
                        data:[1, 1, 2, 1, 1, 3, 5]
                    }
                ]
            }
        );
        // 绘制图表
        myChart2.setOption({
            color: ['#fe8e6e'],
            xAxis: {
                type: 'category',
                data: ['18-01', '18-02', '18-03', '18-04', '18-05', '18-06', '18-07']
            },
            yAxis: {
                    name: '人数',
                    nameLocation: 'end',
                    type: 'value',
                    inverse: false

            },
            series: [{
                data: [100, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                            color: '#615a5a'
                            },
                        formatter:function(params){
                            if(params.value==0){
                            return '';
                        }else
                        {
                            return params.value;
                        }
                    }
                    }
                    }
                    },
            }]
        });
    }

    ut_handleChange = (value) => {
        this.setState({
            usertype : value
        })
        console.log(this.state)
    }
    t_handleChange = (value) => {
        this.setState({
            type : value
        })
        console.log(this.state)
    }

    handlePanelChange = (value, mode) => {
        this.setState({
            value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
        });
    }

    onSubmit = () => {



        if(this.state.value.length > 0){
            if(this.state.type == ''){
                message.error('请选择类型');
                return;
            }
        }
        if(this.state.type != ''){
            if(this.state.value.length < 2){
                message.error('请选择起止时间');
                return;
            }
        }

        if(this.state.value.length < 2 && this.state.type == '' && this.state.usertype == ''){
            message.error('请选择筛选条件');
            return;
        }

        let months = this.state.value[0]._d.getFullYear() + '-' + (this.state.value[0]._d.getMonth()+1) + '-' + this.state.value[0]._d.getDate();
        let monthe = this.state.value[1]._d.getFullYear() + '-' + (this.state.value[1]._d.getMonth()+1) + '-' + this.state.value[1]._d.getDate();

        axios.post('/page/customer/detail',{type : this.state.type, usertype : this.state.usertype, months : months, monthe : monthe})
        .then(res => {

            if(res.data.result == "OK") {
                let myChart = echarts.init(document.getElementById('main'));
                let myChart2 = echarts.init(document.getElementById('main2'));
                myChart.setOption(res.data.data.line);
                myChart2.setOption(res.data.data.bar);
                this.setState({
                    tabledata : res.data.data.list
                })
            } else if(res.data.result == "ERROR") {
                message.error(res.data.message);
            }
        })
        .catch(err => {
            alert("Catch Err:" + err);
        })

    }

    onReport = async() => {

        if(this.state.value.length > 0){
            if(this.state.type == ''){
                message.error('请选择类型');
                return;
            }
        }
        if(this.state.type != ''){
            if(this.state.value.length < 2){
                message.error('请选择起止时间');
                return;
            }
        }

        if(this.state.value.length < 2 && this.state.type == '' && this.state.usertype == ''){
            message.error('请选择筛选条件');
            return;
        }

        let months =  moment(this.state.value[0]._d).format('YYYY-MM-DD');
        let monthe =  moment(this.state.value[1]._d).format('YYYY-MM-DD');

        const params = {
            type: this.state.type,
            usertype: this.state.usertype,
            months: months,
            monthe: monthe
        }

        let res = await axios({
            method: "get",
            url: "/page/report/report",
            responseType: 'blob',
            params: params
        })
        console.log(res.data);
        if (!res) {
            console.error('服务器异常');
            return;
        }
        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download','客户管理' + '.xlsx')
        document.body.appendChild(link)
        link.click()
    }

    onPLReport = async() => {

        if(this.state.value.length > 0){
            if(this.state.type == ''){
                message.error('请选择类型');
                return;
            }
        }
        if(this.state.type != ''){
            if(this.state.value.length < 2){
                message.error('请选择起止时间');
                return;
            }
        }

        if(this.state.value.length < 2 && this.state.type == '' && this.state.usertype == ''){
            message.error('请选择筛选条件');
            return;
        }

        let months =  moment(this.state.value[0]._d).format('YYYY-MM-DD');
        let monthe =  moment(this.state.value[1]._d).format('YYYY-MM-DD');

        const params = {
            type: this.state.type,
            usertype: this.state.usertype,
            months: months,
            monthe: monthe
        }

        let res = await axios({
            method: "get",
            url: "/page/report/plReport",
            responseType: 'blob',
            params: params
        })

        if (!res) {
            console.error('服务器异常');
            return;
        }
        const url = window.URL.createObjectURL(res.data)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download','PL报表' + '.xlsx')
        document.body.appendChild(link)
        link.click()
    }

    async onDetial(e){

        let months =  moment(this.state.value[0]._d).format('YYYY-MM-DD');
        let monthe = moment(this.state.value[1]._d).format('YYYY-MM-DD');
        let { data } = await axios.post('/page/customer/detail/sdetail',
        {
            name    : e.ClientName,
            months  : months,
            monthe  : monthe,
            type: this.state.type,
            usertype: this.state.usertype,
        });

        if(!data){
            console.error('服务器异常');
            return;
        }
        console.log('详情',data);
        this.setState({
            visible     : true,
            stabledata  : data.data ? data.data : []
        })
    }

    render() {
        const { value, mode } = this.state;

        return (
            <div className="main">
            {/* 左部 */}
                <div className="searchbar-main">
                    <Card title="月份筛选" style={{ textAlign: 'left' }}>
                        <RangePicker
                            value={value}
                            mode={mode}
                            placeholder={['开始月份', '截止月份']}
                            format="YYYY-MM"
                            locale={locale}
                            onPanelChange={this.handlePanelChange}
                        />
                    </Card>
                    <Card title="类型选择" style={{ textAlign: 'left' }}>
                        <Select defaultValue="请选择类型" style={{ width: '100%', float:'left' }} onChange={this.t_handleChange}>
                            <Option value="1">接收</Option>
                            <Option value="2">初检</Option>
                            <Option value="3">维修</Option>
                            <Option value="4">替换</Option>
                            <Option value="5">发货</Option>
                        </Select>
                    </Card>
                    <Card title="客户类型选择" style={{ textAlign: 'left' }}>
                        <Select defaultValue="请选择客户类型" style={{ width: '100%', float:'left' }} onChange={this.ut_handleChange}>
                            <Option value="1">G10000</Option>
                            <Option value="2">重要客户</Option>
                            <Option value="3">全部</Option>
                            <Option value="4">所有用户</Option>
                        </Select>
                    </Card>
                    <Card style={{ textAlign: 'left' }}>
                        <Button onClick={this.onSubmit} style={{ width: '80%', marginLeft: '10%' }} type="primary" icon="search">查询</Button>
                        <Button onClick={this.onReport} style={{ marginTop:'10px',width: '80%', marginLeft: '10%',backgroundColor:'#aad770',color:'white' }}  icon="file">客户管理</Button>
                        <Button onClick={this.onPLReport} style={{ marginTop:'10px',width: '80%', marginLeft: '10%',backgroundColor:'#aad770',color:'white' }}  icon="file">PL报表</Button>
                    </Card>
                </div>
                {/* 右部 */}
                <div className="main-right">
                {/* 柱状图，折线图 */}
                    <div className="imgshow">
                        <div id="main" className="line" ></div>
                        <div id="main2" className="line2" ></div>
                    </div>
                {/* 表格 */}
                    <div>
                        <Table onRow={(record) => {return { onClick: this.onDetial.bind(this,record)}; }} scroll={{ y: 300 }} className="tab" columns={titlebar} dataSource={this.state.tabledata} pagination={false} />
                        <div>
                            <Modal footer={null} title="故障数详情" visible={this.state.visible} onOk={ () => this.setState({visible : false})} onCancel={ () => this.setState({visible : false})}>
                                <Table scroll={{ y: 300 }} columns={stitlebar} dataSource={this.state.stabledata} pagination={false} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Report;
