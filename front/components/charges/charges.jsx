import axios from "axios"
import styles from "./charges.module.css"
import { useEffect, useState } from "react"

// "id": "tr4cwporxt3d344ieaoh",
// "customer_id": "atjniju5zvy0tmhke7ed",
// "description": "test",
// "amount": 20,
// "method": "store",
// "currency": "MXN",
// "barcode_url": null,
// "transaction_type": "charge",
// "status": "in_progress",
// "created_at": "2023-11-24T23:42:56.000Z"

function Charges() {
    const url = "http://localhost:3000/charges"
    const [charges, setCharges] = useState([])

    useEffect(() => {
        getCharges()
    }, [])

    function getCharges(){
        axios.get(url)
        .then((data) => {
            if (data.status !== 200) {
                throw Error(data.message)
            }
            setCharges(data.data.response)
        })
        .catch((error) => {
            alert("Error getting charges: " + error.message)
        })
    }
    console.log(charges)
  return (
    <div className={styles.container} >
        <h1>Charges</h1>
        {charges.length === 0 ? <p>No charges found</p> : (
            <div className={styles.listCharges}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Customer Id</th>
                    <th>Customer Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Currency</th>
                    <th>Barcode Url</th>
                    <th>Transaction Type</th>
                    <th>Status</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {charges.map((charge) => (
                    <tr key={charge.id}>
                        <td>{charge.id}</td>
                        <td>{charge.customer_id}</td>
                        <td>{charge.name}</td>
                        <td>{charge.description}</td>
                        <td>{charge.amount}</td>
                        <td>{charge.method}</td>
                        <td>{charge.currency}</td>
                        <td>{charge.barcode_url}</td>
                        <td>{charge.transaction_type}</td>
                        <td>{charge.status}</td>
                        <td>{new Date(charge.created_at).toLocaleDateString(
													"es-MX"
												)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        )}
    </div>
  )
}

export default Charges