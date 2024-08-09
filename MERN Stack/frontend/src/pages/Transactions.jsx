import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Heads from '../components/Heads'
import Headers from '../components/Headers'
import Footers from '../components/Footers'
import '../css/bootstrap.min.css'
import '../css/site.css'
import '../css/style.css'

const Transactions = () => {
  return (
    <div>
      <Heads></Heads>
      <Headers></Headers>
      <div class="container">
        <main role="main" class="pb-3">
          <div>
            <br></br>
            <h2>Lịch sử giao dịch:</h2>
      <div id="container" style={{marginTop: '200px'}}>
        <div className="printing-history-box">
        <div className="table-container">
            <table className="content-table">
            <thead>
                <tr>
                <th>Order Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total cost</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody><tr>
                <td>{'{'}{'{'}this.createdAt{'}'}{'}'}</td>
                <td>
                    {'{'}{'{'}#each this.products{'}'}{'}'}
                    {'{'}{'{'}this.name{'}'}{'}'}
                    {'{'}{'{'}#unless @last{'}'}{'}'}<br /><hr /> {'{'}{'{'}/unless{'}'}{'}'}
                    {'{'}{'{'}/each{'}'}{'}'}
                </td>
                <td>
                    {'{'}{'{'}#each this.products{'}'}{'}'}
                    {'{'}{'{'}this.qty{'}'}{'}'}
                    {'{'}{'{'}#unless @last{'}'}{'}'}<br /><hr /> {'{'}{'{'}/unless{'}'}{'}'}
                    {'{'}{'{'}/each{'}'}{'}'}
                </td>
                <td>{'{'}{'{'}this.totalcost{'}'}{'}'}</td>
                <td>
                    {'{'}{'{'}#if (isBool this.declined true){'}'}{'}'}
                    <button type="button" className="btn btn-danger">Declined</button>
                    {'{'}{'{'}else{'}'}{'}'}
                    {'{'}{'{'}#if (isBool this.delivered true){'}'}{'}'}
                    <button type="button" className="btn btn-success">Delivered</button>
                    {'{'}{'{'}else{'}'}{'}'}
                    <button type="button" className="btn btn-warning">Processing</button>
                    {'{'}{'{'}/if{'}'}{'}'}
                    {'{'}{'{'}/if{'}'}{'}'}
                </td>
                </tr><tr />
            </tbody>
            </table>
        </div>
        </div>
    </div>
          </div>
        </main>
      </div>
      <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footers></Footers>
    </div>
  )
}

export default Transactions