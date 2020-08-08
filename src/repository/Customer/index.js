import { apiGetWithToken, apiPutWithToken, apiGetWithoutToken } from "../../services/api";
import { PATH_CUSTOMER } from "../../services/path/customer";
import { PATH_PUBLIC } from "../../services/path/public";

async function get(props) {
  const loading = props.loading ? props.loading : function() {};
  let response = "";
  loading(true);
  try {
    response = await apiGetWithToken(PATH_CUSTOMER.CUSTOMER);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function resendVerification(props){
  const loading = props.loading ? props.loading : function(){};
  let response = "";
  loading(true)
  try{
    response = await apiGetWithToken(PATH_PUBLIC.PUBLIC_USER_RESEND_VERIFICATION);
    loading(false);
    return response;
  } catch (error){
    loading(false);
    return error;
  }
}

async function update(props) {
  const loading = props.loading ? props.loading : function() {};
  let response = "";
  let params = props.params;
  loading(true);
  try {
    response = await apiPutWithToken(PATH_CUSTOMER.CUSTOMER, params);
    loading(false);
    return response;
  } catch (error) {
    loading(false);
    return error;
  }
}

async function activated(props){
  const loading = props.loading ? props.loading : function(){};
  let idActivated = props.idActivated;
  let response = "";
  loading(true);
  try{
    response = await apiGetWithoutToken(`${PATH_PUBLIC.PUBLIC_USER_ACTIVED}/${idActivated}`)
    loading(false);
    return response
  } catch (error){
    loading(false);
    return error
  }
}

const Customer = {
  get,
  update,
  activated,
  resendVerification
};

export default Customer;
