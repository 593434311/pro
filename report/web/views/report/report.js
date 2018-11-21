var report 	= require('report');
var math 	= require('math');
var server	= require('server');
var db      = require('db');

function onInit(){
    // var param = {
    //     type        : '1',
    //     months      : '2018-02-01',
    //     monthe      : '2018-11-05',
    //     usertype    : '2',

        
    // };
    log(this.GetString("months"));

    action(this, param);
}

// Post方法
function onPost() {
    var param = this.GetBodyJson();

    action(this, param);

}


function action(o,param){
    //条件
    var sData = filter(param);
    // 1. 创建数据表格对象
    var tb = report.NewTable();
    // 2. 加载配置XML文件。其中设置了数据集所在的cell位置
    var err = tb.LoadXmlFile('views/report/report.xml');
    // 3. 得到sheet1
    var root = tb.GetRoot(0);
    var table="";
    if(sData.table){
        table = sData.table;
    }
    var sSql = "select t1.ClientName ClientName,t1.AgentID AgentID,s1.Text Potential,t1.Period Period,"
             + "t1.EntrustCode EntrustCode,t4.Type TypeID,t1.GroupNum GroupNum,CONVERT(varchar(100),t1.MakeDate,23) MakeDate,"
             + "s2.Text IsBao,s3.Text LiabilityJudgment,t2.CheckFaultPoint CheckFaultPoint,t1.Phenomena Phenomena,"
             + "s4.Text Conclusion,t5.Name Sendto,t1.AnticipatedFee AnticipatedFee,t2.Face Face,t2.Decompound Decompound,"
             + "t2.CheckPowerOn CheckPowerOn,t2.CheckConclusionExplain CheckConclusionExplain,t2.CheckRepairExplain CheckRepairExplain,"
             + "t2.Additional Additional,t1.SpecialRecord SpecialRecord "
             + "from T_RC_Entrust t1 "
             + "left join T_RC_CheckReport t2 on t2.EntrustID=t1.ID "
             + " "+table+" "
             + "left join Sys_Mod_Column_Item s1 on s1.ColumnID in(select ID from Sys_Mod_Column where ModuleID='573d67ec-1ad0-4388-bf71-cdf64254adb0' and DbColumn='Potential') and s1.ItemValue=t1.Potential "
             + "left join T_RC_PRODUCT t4 on t4.ID=t1.TypeID "
             + "left join Sys_Mod_Column_Item s2 on s2.ColumnID in(select ID from Sys_Mod_Column where ModuleID='573d67ec-1ad0-4388-bf71-cdf64254adb0' and DbColumn='IsBao') and s1.ItemValue=t1.IsBao "
             + "left join Sys_Mod_Column_Item s3 on s3.ColumnID in(select ID from Sys_Mod_Column where ModuleID='573d67ec-1ad0-4388-bf71-cdf64254adb0' and DbColumn='LiabilityJudgment') and s1.ItemValue=t1.LiabilityJudgment "
             + "left join Sys_Mod_Column_Item s4 on s4.ColumnID in(select ID from Sys_Mod_Column where ModuleID='573d67ec-1ad0-4388-bf71-cdf64254adb0' and DbColumn='Conclusion') and s1.ItemValue=t1.Conclusion "
             + "left join T_RC_ProductionPlant t5 on t5.ID=t1.Sendto "
             + "where 1=1 "+sData.sFilter+" "+sData.sTime+"";
    var r = db.QueryRows(sSql);
    for(var i = 0;i< r.Count;i++){
        // 4. 写入一行数据
        root.WriteOne({
            "ClientName"             : r.Rows[i].ClientName,//公司全称
            "AgentID"                : r.Rows[i].AgentID,               //代理店
            "Potential"              : r.Rows[i].Potential,             //是否G10000
            "Period"                 : r.Rows[i].Period,                //纳期
            "EntrustCode"            : r.Rows[i].EntrustCode,           //查询号
            "TypeID"                 : r.Rows[i].TypeID,                //维修型号
            "GroupNum"               : r.Rows[i].GroupNum,              //批号
            "MakeDate"               : r.Rows[i].MakeDate,              //制造日期
            "IsBao"                  : r.Rows[i].IsBao,                 //保修状况
            "LiabilityJudgment"      : r.Rows[i].LiabilityJudgment,     //责任判断
            "CheckFaultPoint"        : r.Rows[i].CheckFaultPoint,       //故障点
            "Phenomena"              : r.Rows[i].Phenomena,             //故障现象
            "Conclusion"             : r.Rows[i].Conclusion,            //初检结论
            "Sendto"                 : r.Rows[i].Sendto,                //送修工厂
            "AnticipatedFee"         : r.Rows[i].AnticipatedFee,        //预计费用
            "Face"                   : r.Rows[i].Face,                  //外观检测
            "Decompound"             : r.Rows[i].Decompound,            //内部检测
            "CheckPowerOn"           : r.Rows[i].CheckPowerOn,          //功能检测
            "CheckConclusionExplain" : r.Rows[i].CheckConclusionExplain,//结论说明
            "CheckRepairExplain"     : r.Rows[i].CheckRepairExplain,    //修理预判
            "Additional"             : r.Rows[i].Additional,            //附件检测
            "SpecialRecord"          : r.Rows[i].SpecialRecord          //全局备注
        });
    }
    // 5. 生成excel文件
	var filename = "views/report/s2_out.xlsx";
	err = tb.Save(filename);
	if (err) {
		this.Ctx.WriteString('err' + err.Error());
		return;
    }
    // 6. 输出给前台
	o.Ctx.Output.Download(filename);
	// 7. 删除临时文件
    server.RemoveFile(filename);
}

// Filter
function filter(param) {
    var sTime = "";
    var sFilter="";
    var data={};
    var table ="";

    log("param.type"+param.type  == "2");
    log("param.usertype"+param.usertype);
    log("param.months"+param.months);
    log("param.monthe"+param.monthe);

    if (param.type) {
        if (param.type == "1") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.AcceptDate,'" + param.months + "')<=0 and DateDIFF(M,t1.AcceptDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "2") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.EndDate,'" + param.months + "')<=0 and DateDIFF(M,t1.EndDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "3") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.RepairEndDate,'" + param.months + "')<=0 and DateDIFF(M,t1.RepairEndDate,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "4") {
            if (param.months && param.monthe) {
                sTime = " and DateDIFF(M,t1.ReplaceEnd,'" + param.months + "')<=0 and DateDIFF(M,t1.ReplaceEnd,'" + param.monthe + "')>=0";
            }
        } else if (param.type == "5") {
            if (param.months && param.monthe) {
                table = "left join T_RC_DelivPacket t3 on t3.ID = t1.DelivPacketID";
                sTime = " and DateDIFF(M,t3.SendDate,'" + param.months + "')<=0 and DateDIFF(M,t3.SendDate,'" + param.monthe + "')>=0";
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
    return data;
}



