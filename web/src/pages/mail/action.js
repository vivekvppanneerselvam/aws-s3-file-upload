import serverCall from '../../modules/serverCall'
import axios from 'axios'

export const submitQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'SUB_QUERY_LOADING', loading: true, error: false })
        return serverCall({ method: 'post', url: '/query', data: payload }).then(res => {
            return dispatch({ type: 'SUB_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'SUB_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const awsFileUpload = (formData) => {
    return dispatch => {
        dispatch({ type: 'AWS_FILE_UPLOAD_LOADING', loading: true, error: false })
        return axios.post(UPLOAD_URL, formData).then((res) => {
            return dispatch({ type: 'AWS_FILE_UPLOAD', loading: false, data: res.data, error: false })
            alert("File Upload success");
        }).catch((err) => {
            alert("File Upload Error")
            dispatch({ type: 'AWS_FILE_UPLOAD_ERROR', loading: false, data: err, error: true })
        });
    }
}