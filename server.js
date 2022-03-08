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

const start = async ()=>{
    try{
        await sequelize.sync({force: true});
        
        syncAndSeed();
    }
    catch(err){
        console.log(err);
    }
};

start();