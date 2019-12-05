import React from 'react';
import PieChart from "react-minimal-pie-chart";

class AnnuallyPie extends React.Component {

    componentDidMount() {
        const d = new Date();
        
        this.props.fetchAllIncome();

        this.props.fetchAllExpenses();
        this.props.annualExpense({year: d.getFullYear()})
    }

    annualPie() {
        const { listOfExpense } = this.props;

        const types = {};
        // listOfExpense.forEach(el => types[el._id.type] = el._id.amount);
        for (let i = 0; i < listOfExpense.length; i++) {
            let el = listOfExpense[i];

            if (types[el._id.type]) {
                types[el._id.type] += el._id.amount;
            } else {
                types[el._id.type] = el._id.amount
            }
        }

        const color = ['yellow', 'red', 'orange', 'grey',
            'maroon', 'blue', 'indigo', 'violet', 'teal'];
        
        const data = [];
        let i = 0;

        for (let key in types) {
            const newData = {
                title: key,
                value: types[key],
                color: color[i]
            };
            i++
            data.push(newData)
        }

        return data;
    }

    render() {
        const { listOfExpense } = this.props;

        if (!listOfExpense) {
            return null;
        };

        return (
            <div className='main-page-div'>
                <div className='container'>
                    <div className='box'>
                        <div>Income</div>

                        {/* <div>Expenses: {totalExpenseMonthly}</div> */}

                        <div className='chart-month-div'>
                            <PieChart
                                className='pie-chart-div'
                                data={this.annualPie()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default AnnuallyPie;