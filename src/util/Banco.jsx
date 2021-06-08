
import axios from "axios";
import { SERVIDOR } from "./Config";

const http = axios.create({
    baseURL:SERVIDOR,
})


export default http;
