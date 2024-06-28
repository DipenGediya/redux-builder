import React, { useEffect, useState } from 'react'
import { get_api, post_api } from '../../api/api'
import { add_product_cart, get_product } from '../../Constant'
import { Button } from '../../atoms/Atom';
import Swal from 'sweetalert2';

const Home = () => {

  let [product, setProduct] = useState([]);

  async function GET_Product() {
    try {
      let res = await get_api(get_product);
      console.log(res);

      setProduct(res.data.filter((val) => val.isActive === true))
      console.log(product);

    } catch (error) {
      console.log("sorry");
    }
  }

  useEffect(() => {
    GET_Product()
  }, [])

  async function addcart(product) {

    try {
      let res = await post_api(add_product_cart, product)
      console.log(res);
      if (res.status == 201) {
        Swal.fire({
          title: "Good job!",
          text: "Product Added Successfully",
          icon: "success"
        })
      }
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <>
      <div className="product mt-5">
        <div className="container">
          <div className="row">
            
            {
              product.map((val, index) => {
                return (
                  <>
                    <div className="col-3" key={index}>
                      <div class="card">
                        <img src={val.image} class="p-2 card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{val.name}</h5>
                          <p class="card-text">{val.disc}</p>
                          <p class="card-text fw-semibold">Price :-  {val.price}</p>
                          <Button content="Add To Cart" onfunction={() => addcart(val)} property="btn btn-outline-dark w-100" />
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home