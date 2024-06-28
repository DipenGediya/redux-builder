import React, { useEffect, useState } from 'react'
import { delete_api, get_api, post_api, update_api } from '../../api/api'
import { add_product, get_product, remove_product, update_product } from '../../Constant'
import Switch from '@mui/material/Switch';
import { Button, H2 } from '../../atoms/Atom';
import Swal from 'sweetalert2';


const Manage = () => {

  const [product, setProduct] = useState([])
  const [AddProduct, setAddProduct] = useState({ isActive: true })
  const [View, setView] = useState({})
  const [search, setsearch] = useState({})

  async function GET_Product() {
    try {
      let res = await get_api(get_product)
      console.log(res);
      setProduct(res.data)
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    GET_Product()
  }, [])

  function handleProduct(e) {
    setAddProduct({ ...AddProduct, [e.target.name]: e.target.value })
  }

  function duplicate_product(name) {
    let duplicate = product.filter((val) => val.name == name);
    return duplicate;
  }

  async function POST_Product() {

    let duplicate = duplicate_product(AddProduct.name);

    if (duplicate.length != 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Product Already Exits",
      });
    }
    else {
      try {
        let res = await post_api(add_product, AddProduct);
        setProduct([...product, res.data])
        if (res.status == 201) {
          Swal.fire({
            title: "Good job!",
            text: "Product Added Successfully",
            icon: "success"
          });
        }
      } catch (error) {
        console.log("error");
      }
    }

  }

  function deleteProduct(id) {
    delete_api(remove_product, id)

    setProduct(product.filter((val) => val.id !== id));
  }

  function viewProduct(product) {
    setView(product)
  }

  function handleView(e) {
    setView({ ...View, [e.target.name]: e.target.value })
  }

  function updateProduct() {
    update_api(update_product, View)

    setProduct(product.map((val, index) => val.id == View.id ? { ...View } : val))
  }

  async function check_Availability(id) {

    let updateAvailability = product.find((val) => val.id == id);

    if (updateAvailability) {
      updateAvailability.isActive = !updateAvailability.isActive;
      await update_api(update_product, updateAvailability);
      setProduct(product.map((val, index) => val.id == id ? { ...updateAvailability } : val))
    }
  }

  function handleSearch(e) {
    setsearch(e.target.value)
  }

  let searchData = product.filter((val) => val.name.includes(search))

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-9">

            <input type="text" className='mb-3' placeholder='Search Product' onChange={handleSearch} />

            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Avialabel</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>



              <tbody>
                {
                  searchData.map((val, index) => {
                    return (
                      <>
                        <tr>
                          <td><img src={val.image} style={{ height: "38px" }} /></td>
                          <td>{val.name}</td>
                          <td>{val.price}</td>
                          <td>{val.disc}</td>
                          <td><Switch checked={val.isActive} onClick={() => check_Availability(val.id)} /></td>
                          <td><button className='btn btn-outline-dark' onClick={() => deleteProduct(val.id)}><i class="fa-solid fa-trash-can"></i></button></td>
                          <td><button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => viewProduct(val)}><i class="fa-regular fa-eye"></i></button></td>
                        </tr>
                      </>
                    )
                  })
                }
                {
                  product.map((val, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td><img src={val.image} style={{ height: "38px" }} /></td>
                          <td>{val.name}</td>
                          <td>{val.price}</td>
                          <td>{val.disc}</td>
                          <td><Switch checked={val.isActive} onClick={() => check_Availability(val.id)} /></td>
                          <td><button className='btn btn-outline-dark' onClick={() => deleteProduct(val.id)}><i class="fa-solid fa-trash-can"></i></button></td>
                          <td><button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => viewProduct(val)}><i class="fa-regular fa-eye"></i></button></td>
                        </tr>
                      </>
                    )
                  })
                }
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div className='my-3'>
                          <label className='me-2'>Image :-</label>
                          <input type="text" name='image' value={View.image} onChange={handleView} />
                        </div>
                        <div className='my-3'>
                          <label className='me-2'>Product Name :-</label>
                          <input type="text" name='name' value={View.name} onChange={handleView} />
                        </div>
                        <div className='my-3'>
                          <label className='me-2'>Price :- </label>
                          <input type="number" name='price' value={View.price} onChange={handleView} />
                        </div>
                        <div className='my-3'>
                          <label className='me-2'>Discripation :- </label>
                          <input type="text" name='disc' value={View.disc} onChange={handleView} />
                        </div>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={updateProduct}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </tbody>
            </table>
          </div>

          <div className="col-3">
            <div class="card p-3">
              <div class="card-body fw-semibold">
                <H2 content="Product" />
                <label>Image :- </label><br />
                <input type="text" className='my-2' style={{ width: "100%" }} name='image' onChange={handleProduct} /><br />
                <label>Name:- </label><br />
                <input type="text" className='my-2' style={{ width: "100%" }} name='name' onChange={handleProduct} /><br />
                <label>Price :-</label><br />
                <input type="number" className='my-2' style={{ width: "100%" }} name='price' onChange={handleProduct} /><br />
                <label>Description :-</label><br />
                <input type="text" className='my-2' style={{ width: "100%" }} name='disc' onChange={handleProduct} /><br />
                <Button content="Save" property="btn btn-outline-dark mt-3 w-100" onfunction={POST_Product} />

              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Manage