import React, { useEffect, useState } from 'react'
    ;
import { delete_api, get_api } from '../../api/api';
import { get_product_cart, remove_product_cart } from '../../Constant';
import { Button } from '../../atoms/Atom';
import Swal from 'sweetalert2';

const AddToCart = () => {

    const [cartProduct, setcartProduct] = useState([]);
    // const [price, setprice] = useState([])
    const [TotalSum, setTotalSum] = useState(0)

    async function GET_cartproduct() {
        try {
            let res = await get_api(get_product_cart);
            console.log(res);
            setcartProduct(res.data)
        } catch (error) {
            console.log("error");
        }
    }

    useEffect(() => {
        GET_cartproduct();
    }, []);

    useEffect(() => {
        let prices = cartProduct.map((val, index) => val.price);
        console.log(prices);
        setTotalSum(prices.reduce((sum, price) => sum + parseInt(price), 0));
    }, [cartProduct])

    async function deleteCart(id) {
        try {
            let res = await delete_api(remove_product_cart, id);
            console.log(res);
            setcartProduct(cartProduct.filter((val) => val.id !== id))
            if (res.status == 200) {
                Swal.fire({
                    title: "Good job!",
                    text: "Delete Successfully",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log("error");
        }

    }

    return (
        <>
            <section className="cart_Product">
                <div className="container">
                    <div className="row">

                        <table className='table mt-5'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    cartProduct.map((val, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td><img src={val.image} style={{ height: "38px" }} /></td>
                                                    <td>{val.name}</td>
                                                    <td>{val.disc}</td>
                                                    <td>{val.price}</td>
                                                    <td><button className='btn btn-outline-dark' onClick={() => deleteCart(val.id)}><i class="fa-solid fa-trash-can"></i></button></td>

                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total :- {TotalSum}</td>
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>
        </>
    )

}

export default AddToCart