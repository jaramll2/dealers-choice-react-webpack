import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            bills: []
        };
        this.create = this.create.bind(this);
    }
    
    async componentDidMount(){
        const response = await axios.get('/api/bills');
        const bills = response.data;
        this.setState({ bills });
    }

    async create(){
        const billName = document.getElementById('name').value
        const billAmount = parseInt(document.getElementById('amount').value);

        const newBill = {name: billName, amount: billAmount};

        const response = await axios.post('/api/bills', newBill);
        const bill = response.data;
        const bills = [...this.state.bills,bill];
        this.setState({bills});

    }

    async destroy(bill){
        await axios.delete(`/api/bills/${bill.id}`);
        const bills = this.state.bills.filter(_bill=>_bill.id !==bill.id);
        this.setState({bills});
    }

    render(){
        const bills = this.state.bills;
        return (<><div>
            <ul>
                {bills.map(bill => {
                    console.log(bill)
                    return (
                        <li key={bill.id}>Description: {bill.name} Amount: ${bill.amount} <br></br> <button onClick={()=> this.destroy(bill)}>Remove Bill For the Month</button></li>
                    );
                })}
            </ul>
        </div>
        
        <div id="form">
                <form>
                    <label for='name'>Bill Name: </label><br></br>
                    <input type='text' id='name' name ='name'></input><br></br>
                    <label for="amount">Amount:</label><br></br>
                    <input type="text" id="amount" name="amount"></input><br></br>
                    <input type="button" value='Add Another Bill?' onClick={this.create}></input>
                </form>
        </div></>
        );
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);