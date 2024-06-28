import axios from "axios";
import { base_url } from "../Constant";

async function get_api(endPoint) {
    let res = await axios.get(base_url + endPoint);
    return res;
};

async function post_api(endPoint, AddProduct) {
    let res = await axios.post(base_url + endPoint, AddProduct);
    return res;
};

function delete_api(endPoint, id) {
    axios.delete(base_url + endPoint + `${id}`);
};

async function update_api(endPoint, View) {
    let res = await axios.put(base_url + endPoint + `${View.id}`, View);
    return res;
};

export { get_api, post_api, delete_api, update_api }