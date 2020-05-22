const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const models = require('../db/models');

app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

//for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//1. 所有的错误，http status == 500

/* 创建一个todo */
app.post('/create', async (req, res, next) => {
    try {
        const { name, deadline, content } = req.body;
        /* 数据持久化到数据库 */
        const todo = await models.Todo.create({
            name,
            deadline,
            content
        })
        res.json({
            todo,
            message:'任务创建成功'
        })
    } catch (error) {
        next(error);
    }
})

/* 修改或删除一个todo */
app.post('/update_status', async (req, res, next) => {
    const { id, status } = req.body;
    let todo = await models.Todo.findOne({
        where:{
            id
        }
    })
    if(todo && status != todo.status){
        // 执行更新
        todo = await todo.update({
            status
        })
    }
    res.json({
        todo
    })
})

/* 查询任务列表 */
app.get('/list/:status/:page', async (req, res, next) => {
    const { status, page } = req.params;
    const limit = 10;
    const offset = (page - 1) * limit;
    const where = {};
    if(status != -1) {
        where.status = status;
    }
    // 1. 状态 1：表示待办， 2：完成， 3：删除， -1：全部
    // 2. 分页的处理
    const list = await models.Todo.findAndCountAll({
        where,
        offset,
        limit: 10
    })
    res.json({
        list,
        message: '列表查询成功'
    })
});

/* 创建一个todo */
app.post('/create', async (req, res, next) => {
    const { name, deadline, content } = req.body;
    res.json({
        todo:{},
        deadline,
        name,
        content
    })
})

/* 修改一个todo */
app.post('/update', async (req, res,next) => {
    try {
        const { name, deadline, content, id } = req.body;
        let todo = await models.Todo.findOne({
            where:{
                id
            }
        })
        if(todo) {
            // 执行更新功能
            todo = await todo.update({
                name,
                deadline,
                content
            })
        }
        res.json({
            todo
        })
    } catch (error) {
        next(error);
    }
})





app.use((err, req, res, next) => {
    if(err) {
        res.status(500).json({
            message:err.message
        })
    }
})




app.listen(3000, () => {
    console.log('服务启动成功')
})