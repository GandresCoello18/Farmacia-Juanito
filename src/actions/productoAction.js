import axios from "axios";
import Cookie from 'js-cookie';
import { domain } from "../util/verifi-local-token";
import { ERROR_PRODUCTO, CREAR_NAME_PRODUCTO } from '../types/ProductoTypes';

export const create_name_product = (name) => async (dispatch) => {
    try {
        const i = await axios({
            method: 'post',
            url: `${domain()}/api/producto/nombre_producto`,
            data: {
                name_product: name,
            },
            headers: { "access-token": Cookie.get('access_token') }
        });

        dispatch({
            type: CREAR_NAME_PRODUCTO,
            payload: i.data
        });
    } catch (error) {
        dispatch({
            type: ERROR_PRODUCTO,
            payload: `Error en create name producto: ${error}`,
        });
    }
}