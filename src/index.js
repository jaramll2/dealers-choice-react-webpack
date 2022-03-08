import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            bills: []
        };
    }
    
    async componentDidMount(){
        const response = await axios.get('/api/bills');
        const bills = response.data;
        this.setState({ bills });
    }

    //practice components and props, make bill component 
    render(){
        const bills = this.state.bills;
        return (<div>
            <ul>
                {
                    bills.map(bill=>{
                        return(
                            <li key={bill.id}>Description: {bill.name} Amount: ${bill.amount}</li>
                        );
                    })
                }
            </ul>
        </div>);
    }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);