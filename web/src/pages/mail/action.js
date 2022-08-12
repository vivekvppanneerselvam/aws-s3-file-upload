import serverCall from '../../modules/serverCall'
import axios from 'axios'

const host = 'http://192.168.1.5:4000'

export const submitQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'SUB_QUERY_LOADING', loading: true, error: false })
        return axios.post(host + '/sendmail', payload).then(res => {
            alert("Mail is successfully sent to" + payload.email);
            return dispatch({ type: 'SUB_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'SUB_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const awsFileUpload = (formData) => {
   
    return dispatch => {
        dispatch({ type: 'AWS_FILE_UPLOAD_LOADING', loading: true, error: false })
        return axios.post(host + '/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
            alert("File Uploaded success"+ JSON.stringify(res.data));
            return dispatch({ type: 'AWS_FILE_UPLOAD', loading: false, data: res.data, error: false })
        }).catch((err) => {
            alert("File Upload Error", err)
            dispatch({ type: 'AWS_FILE_UPLOAD_ERROR', loading: false, data: err, error: true })
        });
    }
}