import React, { useState, useEffect } from "react";
import { submitQuery, awsFileUpload } from './action'
function Mail(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        comment: ""
    })
    const [selectedFile, setSelectedFile] = useState(null);

    function onChangeInput(e) {
        let id = e.target.id, value = e.target.value
        setState((prev) => {
            prev[id] = value
            return ({ ...prev })
        })
    }

    function onSubmit() {
        props.submitQuery(state)
    }

    function onClickFileUpload() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", selectedFile);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Mailing and S3 file upload project
                        </div>
                        <div class="panel-body">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Name:</label>
                                <div class="col-sm-10">
                                    <input className="form-control rounded-0" type="text" id="name" name="name" onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">E-mail:</label>
                                <div class="col-sm-10">
                                    <input className="form-control rounded-0" type="text" id="email" name="mail" onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Comment:</label>
                                <div class="col-sm-10">
                                    <textarea className="form-control" type="text" id="comment" name="comment" size="50" onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <input type="file" value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])} /> <button className="btn btn-sm btn-primary rounded-0"> Upload </button>
                            <br /><br />
                            <button className="btn btn-sm btn-primary rounded-0" onClick={()=>onSubmit()}> Send </button>
                            <button className="btn btn-sm btn-secondary rounded-0"> Reset </button></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStoreToProps = state => ({

})
const mapDispatchToProps = {
    submitQuery,
    awsFileUpload
}


export default connect(mapStoreToProps, mapDispatchToProps)(Mail)
