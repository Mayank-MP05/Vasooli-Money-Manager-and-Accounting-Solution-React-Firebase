import React from 'react'

export default function Addtransaction() {
    return (
        <div className="card p-2 m-auto">
            <h4>Add a Transaction</h4>
            <hr/>
            <select className="form-control">
              <option>Income</option>
              <option>Expense</option>
            </select>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Amount</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" placeholder="ex. 546"/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Category</label>
                <div className="col-sm-10">
                    <select className="form-control">
                        <option>Category 1</option>
                        <option>Category 1</option>
                        <option>Category 1</option>
                        <option>Category 1</option>
                        <option>Category 1</option>
                    </select>
                </div>
            </div>   
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="ex. Meal at Gangotri Bill"/>
                </div>
            </div> 
            <div className="row d-flex justify-content-center">
                <button className="btn btn-success">Add Transaction</button>
            </div>
        </div>

    )
}
