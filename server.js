//TODO: Move db code to separate file
const  Sequelize  = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bill_db');

const Bill = sequelize.define('bill',{
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    amount: {
        type: Sequelize.INTEGER
    }
});

const syncAndSeed = async()=>{
    try{
        await Promise.all([
            Bill.create({name: 'Rent',amount: 1000}),
            Bill.create({name: 'Gym Membership',amount: 22}),
            Bill.create({name: 'YouTube Red Subscription',amount: 13}),
            Bill.create({name: 'Internet',amount: 70}),
            Bill.create({name: 'Therapy',amount: 99}),
            Bill.create({name: 'Loan',amount: 283}),
            Bill.create({name: 'Gas',amount: 82}),
            Bill.create({name: 'Nintendo Online',amount: 20})
        ]);
    }
    catch(err){
        console.log(err);
    }
}

Bill.generateRandom =function(){
    return this.create({name: `Bill ${Math.ceil(Math.random()*100)}`, amount: Math.ceil(Math.random() * 400)});
}

const express = require('express');
const app = express();
const path = require('path');

app.use('/dist',express.static(path.join(__dirname, './dist')));

app.get('/',(req,res,)=>res.sendFile(path.join(__dirname,'index.html')));

app.get('/api/bills', async(req,res,next)=>{
    try{
        const bills = await Bill.findAll();
        res.send(bills);
    }
    catch(err){
        next(err);
    }
});

//grab data from req
app.post('/api/bills', async(req,res,next)=>{
    try{
       res.status(201).send(await Bill.generateRandom());
    }
    catch(err){
        next(err);
    }
});

app.delete('/api/bills/:id',async(req,res,next)=>{
    try{
        const bill = await Bill.findByPk(req.params.id);
        await bill.destroy();
        res.sendStatus(204);
    }
    catch(err){
        next(err);
    }
});

const start = async ()=>{
    try{
        await sequelize.sync({force: true});

        syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on ${port}`));
    }
    catch(err){
        console.log(err);
    }
};

start();