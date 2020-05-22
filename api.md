# 需求说明，API说明

1. 根据客户端传递过来的不同参数（状态/页码），查询任务的列表
2. 实现新增一个任务的功能（名称/截止日期/内容）
3. 实现一个编辑的功能：根据客户端传递的任务对象（已经存在的数据）   进行编辑（名称/截止日期/内容/ID）
4. 删除一个任务（ID）
5. 修改任务的状态（ID/状态--待办/完成）

# API实现

## 数据库的初始化
1. 创建一个数据库
2. 使用‘sequelize cli’初始化项目的数据库配置
    ‘npx sequelize init’
3. 生成模型文件
    1. migrate文件
    2. model文件
    ` npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string `

4. 持久化，模型对应的[数据库表]
    `npx sequelize db:migrate`

## API里面具体使用ORM模型
