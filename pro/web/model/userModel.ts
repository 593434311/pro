import * as mongoose from 'mongoose';
import db from './../core/lib/db/mongodb';

// 人员分配 关系表 
let allotPersonSchema: mongoose.Schema = new mongoose.Schema(
    {
        userId: String,
        userName: String,
        assignmentManageId :String ,//assignmentManageModel 主键
        taskType : String,//任务类型
        taskValue :String, // 任务得值
        status : String ,//状态 未完成 TODO 已完成 DONE
        
    }, { collection: 'allotPerson' , timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
export interface AllotPerson extends mongoose.Document {
    userId: string,
    userName: string,
    assignmentManageId :string,
    taskType :string,
    taskValue :string,
    status :string
}
export let allotPersonModel = db.model<AllotPerson>('allotPerson', allotPersonSchema);
