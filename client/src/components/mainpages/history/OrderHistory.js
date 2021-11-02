import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const OrderHistory = () => {
    const state = useContext(GlobalState)
    console.log("state");
    console.log(state);
    const [history, setHistory] = state.userAPI.history
    const [isAdmin, setIsAdmin] = useState(false)
    const [token] = state.token

    useEffect(() => {
        if (token) {
            const getHistory = async() => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data);
                } else {
                    const res = await axios.get('/user/history', {
                        headers: { Authorization: token }
                    })
                    setHistory(res.data);
                }
            }
            getHistory()
        }

    }, [token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>History</h2>
            <h4>You have {history.length} ordered</h4>

                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of Purchase</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>View</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default OrderHistory
