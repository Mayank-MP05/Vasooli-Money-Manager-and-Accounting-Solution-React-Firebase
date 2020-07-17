import React from 'react'

export default function Addvasooli() {
    return (
        <div className="card p-2 m-auto">
            <h4>Request your Money</h4>
            <hr/>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Amount</label>
                <div className="col-sm-10">
                <input type="number" className="form-control" placeholder="ex. 546"/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">To </label>
                <div className="col-sm-10">
                    <select className="form-control">
                        <option>email@email.com 1</option>
                        <option>email@email.com 1</option>
                        <option>email@email.com 1</option>
                        <option>email@email.com 1</option>
                        <option>email@email.com 1</option>
                    </select>
                </div>
            </div>   
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Category </label>
                <div className="col-sm-10">
                    <select className="form-control">
                        <option>Category</option>
                        <option>Category</option>
                        <option>Category</option>
                        <option>Category</option>
                        <option>Category</option>
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
                <button className="btn btn-success">Ask for Vasooli</button>
            </div>
        </div>

    )
}
