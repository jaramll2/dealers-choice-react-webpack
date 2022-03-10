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
        const response = await axios.post('/api/bills');
        const bill = response.data;
        const bills = [...this.state.bills,bill];
        this.setState({bills});

    }

    //practice components and props, make bill component 
    //display data in an easier to read format --- two columns
    render(){
        const bills = this.state.bills;
        return (<><div>
            <ul>
                {bills.map(bill => {
                    return (
                        <li key={bill.id}>Description: {bill.name} Amount: ${bill.amount}</li>
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

let billName = document.querySelector('#name');
let billAmount = document.querySelector('#amount');
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);