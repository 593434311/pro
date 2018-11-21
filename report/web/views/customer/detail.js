var db = require('db');

function onInit() {
    var param = {};
    action(this, param);
}
// Post方法
function onPost() {
    var param = this.GetBodyJson();

    action(this, param);
}

function action(o, param) {
    //var data = XYView(param);//X、Y 线轴显示
    var data = XYAxis(param);
    var IsIm = Important(param);
    o.JsonOK(
        {
            line:(
                {
                    tooltip: {
                        trigger: 'axis'
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
                        data: data[0]
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
                    series: data[1]
                }
            ),
            bar: {
                xAxis: {
                    type: 'category',
                    data: data[0]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: data[2],
                    type: 'bar'
                }]
            },
            //Important
            list:IsIm
        }

    );
}

/*  
    type:1.接收、2.初检、3.维修、4.替换、5.发货。
    months:开始时间
    monthe:结束时间
    usertype:1.G10000、2.重要客户、3.全部。
*/
function condition(param,DateM) {

    var sTime = "";
    var sFilter="";
    var NQFilter ="";
    var data={};
    if (param.type) {
        if (param.type == "1") {
            if (DateM) {
                sTime = " and DateDIFF(M,AcceptDate,'" + DateM + "')=0";
            }
        } else if (param.type == "2") {
            if (DateM) {
                sTime = " and DateDIFF(M,EndDate,'" + DateM + "')=0";
            }
        } else if (param.type == "3") {
            if (DateM) {
                sTime = " and DateDIFF(M,RepairEndDate,'" + DateM + "')=0";
            }
        } else if (param.type == "4") {
            if (DateM) {
                sTime = " and DateDIFF(M,ReplaceEnd,'" + DateM + "')=0 ";
            }
        } else if (param.type == "5") {
            if (DateM) {
                sTime = " and DateDIFF(M,SendDate,'" + DateM + "')=0 ";
            }
        }
        data.sTime = sTime;
    }

    if (param.usertype) {
        if (param.usertype == "1") {
            sFilter += " and (Potential=1 or UnitID in(select ID from T_CC_Unit where Potential=1))";
        } else if (param.usertype == "2") {
            sFilter += " and (IsImportant=1 or UnitID in(select ID from T_CC_Unit where IsImportant=1))";
        } else {
            sFilter += " and ((Potential=1 or UnitID in(select ID from T_CC_Unit where Potential=1)) or ((IsImportant=1 or UnitID in(select ID from T_CC_Unit where IsImportant=1)))";
        }
        data.sFilter = sFilter;
    }
    if (DateM) {
        NQFilter = "and DateDIFF(M,t2.SendDate,'" + DateM + "')=0";
        data.NQFilter = NQFilter;
    }
    return data;
}

function XYAxis(param){
    //变量
    var tData  = [];
    var XYdata = [];
    var data   = [];
    var SZB    = [];//社占比
    var JZB    = [];//件占比
    var BNJ    = [];//保内件数占比
    var SFJ    = [];//保内收费件占比
    var NQN    = [];//平均纳期
    var KHS    = [];//客户数
    //开始-结束月份数目
    var r = db.QueryRow("select DATEDIFF(MONTH,'"+param.months+"','"+param.monthe+"') Number");
    //数目
    var number = r.Data.Number;

    //开始 - 年
    r = db.QueryRow("select DATEPART(YEAR,'"+param.months+"') year");
    var startY = r.Data.year;
    log("startY:"+startY);
    //开始 - 月
    r = db.QueryRow("select DATEPART(month,'"+param.months+"') month");
    var startM = r.Data.month;

    //循环数目
    for(var i=0;i<=number;i++){
        if(i==0){
            startM = startM;
        }else{
            startM = startM+1;
        }
        if(startM>12){
            startM=1;
            startY=startY+1;
        }
        //日期
        var DateM = startY+"-"+startM+"-01";
        var YM = startY+"-"+startM;

        tData.push(YM);
        //SQL条件
        var sdata = condition(param,DateM);
        //X、Y 线轴显示
        XYdata = XYView(sdata,SZB,JZB,BNJ,SFJ,NQN,KHS);
    }
    var datas = [{
        name:'社占比',
        type:'line',
        data:XYdata[0]
    },
    {
        name:'件占比',
        type:'line',
        data:XYdata[1]
    },
    {
        name:'保内件数占比',
        type:'line',
        data:XYdata[2]
    },
    {
        name:'保内收费件数占比',
        type:'line',
        data:XYdata[3]
    },
    {
        name:'平均纳期天数',
        type:'line',
        yAxisIndex:1,
        data:XYdata[4]
    }]
    data.push(tData);
    data.push(datas);
    data.push(XYdata[5]);
    return data;
}

//X、Y 线轴显示
function XYView(sdata,SZB,JZB,BNJ,SFJ,NQN,KHS) {
    
    //变量
    var data = [];
    var Count = 0;
    var sSql = "";
    //平均纳期
    sSql  = "select "
        + "Avg(num) count from  (select "
        + "Case "
        + "When t1.ConfirmDate is not null or t1.ConfirmDate!='1900-01-01 00:00:00.000' "
        + "then DATEDIFF(D,t1.AcceptDate,t2.SendDate)-DATEDIFF(D,t1.EndDate,t1.ConfirmDate) "
        + "else "
        + "DATEDIFF(D,t1.AcceptDate,t2.SendDate) "
        + "end "
        + "-(select COUNT(*) from T_RC_TeleWorkDay where IsContain=0 and DATEDIFF(day,strDate,t1.AcceptDate)<=0 and DATEDIFF(day,strDate,t2.SendDate)>=0) as num "
        + "from T_RC_Entrust t1 "
        + "left join T_RC_DelivPacket t2 on t2.ID=t1.DelivPacketID "
        + "where 1=1 "+sdata.NQFilter+") T";
    var r = db.QueryRow(sSql);
    Count = r.Data.count;
    NQN.push(Count);
    //data.push(Count);
    //社占比
    sSql  = "select "
          + "((select COUNT(distinct(ClientName)) from T_RC_Entrust "
          + "where 1=1 "+sdata.sFilter+" "+sdata.sTime+") "
          + "/"
          + "NULLIF((select COUNT(distinct(ClientName)) from T_RC_Entrust "
          + "where ClientName is not null and AgentID is null "+sdata.sTime+"),0))*100 as count "
    r     = db.QueryRow(sSql);
    Count = r.Data.count;
    SZB.push(Count);
    //件占比
    sSql  = "select "
          + "((select COUNT(*) from T_RC_Entrust "
          + "where 1=1 "+sdata.sFilter+" "+sdata.sTime+") "
          + "/"
          + "NULLIF((select COUNT(*) from T_RC_Entrust where ClientName is not null and AgentID is null "+sdata.sTime+"),0)) as count "
    r     = db.QueryRow(sSql);
    Count = r.Data.count;
    JZB.push(Count);
    //保内件数占比
    sSql  = "select "
          + "((select COUNT(*) from T_RC_Entrust where 1=1 "+sdata.sFilter+" "+sdata.sTime+" and IsBao=1) "
          + "/"
          + "NULLIF((select COUNT(*) from T_RC_Entrust where 1=1 "+sdata.sFilter+" "+sdata.sTime+"),0)) as count "
    r     = db.QueryRow(sSql);
    Count = r.Data.count;
    BNJ.push(Count ? Count : 0);
    //保内收费件占比
    sSql  = "select "
          + "((select COUNT(*) from T_RC_Entrust where 1=1 "+sdata.sFilter+" "+sdata.sTime+" and IsBao=1 and AnticipatedFee>0) "
          + "/"
          + "NULLIF((select COUNT(*) from T_RC_Entrust where 1=1 "+sdata.sFilter+" "+sdata.sTime+" and IsBao=1),0)) as count";
    r     = db.QueryRow(sSql);
    Count = r.Data.count;
    SFJ.push(Count ? Count : 0);
    //重要客户
    sSql  ="select COUNT(*) count from T_RC_Entrust where 1=1 "+sdata.sFilter+" "+sdata.sTime+"";
    r     = db.QueryRow(sSql);
    Count = r.Data.count;
    KHS.push(Count ? Count : 0);

    data.push(SZB);
    data.push(JZB);
    data.push(BNJ);
    data.push(SFJ);
    data.push(NQN);
    data.push(KHS);
    return data;
}

//List显示(重要客户)
function Important(param){
    var list = ListFilter(param);
    var sdata = condition(param);
    var data=[];
    var sSql = "select ClientName,COUNT(*) count, "
             + "BaoFaults= (select isnull(COUNT(*),0) from T_RC_Entrust "
             + "where 1=1 "+sdata.sFilter+" "+list.sdate+" and IsBao=1 and ClientName=t1.ClientName), "
             + "FeeBaoFaults= (select isnull(COUNT(*),0) from T_RC_Entrust "
             + "where 1=1 "+sdata.sFilter+" "+list.sdate+" and IsBao=1 and AnticipatedFee>0 and ClientName=t1.ClientName) "
             + "from T_RC_Entrust t1 where 1=1 "+sdata.sFilter+" " 
             + " "+list.sTime+""
             + "group by ClientName "
             + "order by ClientName";
    var r = db.QueryRows(sSql);
    for(var i=0;i<r.Count;i++){
        var list = {};
        list.No = i+1;
        list.ClientName = r.Rows[i].ClientName;
        list.Total = r.Rows[i].count;
        list.baoFaultCount = r.Rows[i].BaoFaults;
        list.baoChargeCount = r.Rows[i].FeeBaoFaults;
        list.width = 200;
        data.push(list);
    }
    return data;
}

//List Filter
function ListFilter(param){
    var data={};
    var sTime="";
    var sdate ="";
    var sFilter="";
    var sFilters="";
    if (param.type) {
        if (param.type == "1") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.AcceptDate,'" + param.months + "')<=0 and DateDIFF(M,t1.AcceptDate,'" + param.monthe + "')>=0";
                sdate = " and DateDIFF(M,AcceptDate,'" + param.months + "')<=0 and DateDIFF(M,AcceptDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "2") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.EndDate,'" + param.months + "')<=0 and DateDIFF(M,t1.EndDate,'" + param.monthe + "')>=0";
                sdate = " and DateDIFF(M,EndDate,'" + param.months + "')<=0 and DateDIFF(M,EndDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "3") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.RepairEndDate,'" + param.months + "')<=0 and DateDIFF(M,t1.RepairEndDate,'" + param.monthe + "')>=0";
                sdate = " and DateDIFF(M,RepairEndDate,'" + param.months + "')<=0 and DateDIFF(M,RepairEndDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "4") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.ReplaceEnd,'" + param.months + "')<=0 and DateDIFF(M,t1.ReplaceEnd,'" + param.monthe + "')>=0";
                sdate = " and DateDIFF(M,ReplaceEnd,'" + param.months + "')<=0 and DateDIFF(M,ReplaceEnd,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "5") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.SendDate,'" + param.months + "')<=0 and DateDIFF(M,t1.SendDate,'" + param.monthe + "')>=0";
                sdate = " and DateDIFF(M,SendDate,'" + param.months + "')<=0 and DateDIFF(M,SendDate,'" + param.monthe + "')>=0";
            }
        }
        data.sTime = sTime;
        data.sdate = sdate;
    }

    //弹出列表条件使用
    if (param.usertype) {
        if (param.usertype == "1") {
            sFilter += " and (t1.Potential=1 or t1.UnitID in(select ID from T_CC_Unit where Potential=1))";
            sFilters+="and (Potential=1 or UnitID in(select ID from T_CC_Unit where Potential=1))";
        } else if (param.usertype == "2") {
            sFilter += " and (t1.IsImportant=1 or t1.UnitID in(select ID from T_CC_Unit where IsImportant=1))";
            sFilters += " and (IsImportant=1 or UnitID in(select ID from T_CC_Unit where IsImportant=1))";
        } else {
            sFilter += " and ((t1.Potential=1 or t1.UnitID in(select ID from T_CC_Unit where Potential=1)) or ((t1.IsImportant=1 or t1.UnitID in(select ID from T_CC_Unit where IsImportant=1)))";
            sFilters += " and ((Potential=1 or UnitID in(select ID from T_CC_Unit where Potential=1)) or ((IsImportant=1 or UnitID in(select ID from T_CC_Unit where IsImportant=1)))";
        }
        data.sFilter = sFilter;
        data.sFilters = sFilters;
    }
    return data;
}

//弹出详情
function act_sdetail(){
    var param = this.GetBodyJson();
    var slist = ListFilter(param);
    var name = param.name;
    var data = [];
    //拉取产品系列
    var sSql = "select substring(t2.Type,1,(CHARINDEX('-',t2.Type)-1)) series,COUNT(*) "
             + "from T_RC_Entrust t1 "
             + "left join T_RC_PRODUCT t2 on t2.ID=t1.TypeID "
             + "where t1.TypeID is not null and t2.Type like '%-%' and t1.ClientName='"+name+"' "+slist.sTime+""+slist.sFilter+""
             + "group by substring(t2.Type,1,(CHARINDEX('-',t2.Type)-1)) "
             + "union all "
             + "select t2.Type series,COUNT(*) from T_RC_Entrust t1 "
             + "left join T_RC_PRODUCT t2 on t2.ID=t1.TypeID "
             + "where t1.TypeID is not null and t2.Type not like '%-%' and t1.ClientName='"+name+"' "+slist.sTime+""+slist.sFilter+""
             + "group by t2.Type";
    var r = db.QueryRows(sSql);
    log('r.Count:'+r.Count);
    //循环产品系列
    for(var i=0;i<r.Count;i++){
        log("i:"+i);
        log("list.sdate:"+slist.sdate);
        log("list.sFilters:"+slist.sFilters);
        
        //产品系列
        var series = r.Rows[i].series;
        //根据产品系列拉取保内数目
        var r1   = db.QueryRow("select COUNT(*) count from T_RC_Entrust where TypeID in(select ID from T_RC_PRODUCT where Type like '%"+series+"%') and IsBao=1 and ClientName='"+name+"' "+slist.sdate+""+slist.sFilters+"");
        var sNei = r1.Data.count;
        //根据产品系列拉取保外数目
        r1       = db.QueryRow("select COUNT(*) count from T_RC_Entrust where TypeID in(select ID from T_RC_PRODUCT where Type like '%"+series+"%') and IsBao=0 and ClientName='"+name+"' "+slist.sdate+""+slist.sFilters+"");
        var sWai = r1.Data.count;
        var list = {};
        list.series   = series;
        list.faultin  = sNei;
        list.faultout = sWai;
        data.push(list);
    }
    this.JsonOK(data);
}
