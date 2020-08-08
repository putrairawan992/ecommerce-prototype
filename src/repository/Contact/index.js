import { apiPostWithoutToken } from "../../services/api";
import PATH_URL from "../../routers/path";

async function post( props ){
    const loading = props.loading ? props.loading : function(){};
    const params = props.params
    let response = ""
    loading(true)
    try {
        console.log(props)
        response = await apiPostWithoutToken(`${PATH_URL.USER_GUIDE_CONTACT_US}`, params)
        loading(false)
        return response
    } catch (error){
        loading(false)
        return error 
    }
}


const Contact = {
    post
}

export default Contact;