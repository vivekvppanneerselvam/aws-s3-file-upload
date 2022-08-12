import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux'
import { submitQuery, awsFileUpload } from './action'
function Mail(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        comment: ""
    })
    const [doc, setDoc] = useState({
        image: {}
    });
    const fileInputRef = useRef();

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
       // console.log(doc.image)
        let file = doc.image
        formData.append("name", "dummy");
        formData.append("image", file);
        console.log(formData.get('image'))
        props.awsFileUpload(formData)
    }

    function onReset() {
        setState((prev) => {
            prev.name = ""
            prev.email = ""
            prev.comments = ""
            return ({ ...prev })
        })
    }

    function onChangeFile(e) {
        console.log(e.target.files[0])
        let file = e.target.files[0], id ="image"
        
            setDoc(prev=>{
                prev[id] = file
                return ({...prev})
            })
        
        //setSelectedFile(file)
        console.log(doc)

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
                                    <input className="form-control rounded-0" type="text" id="name" name="name" value={state.name} onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">E-mail:</label>
                                <div class="col-sm-10">
                                    <input className="form-control rounded-0" type="text" id="email" name="mail" value={state.email} onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Comment:</label>
                                <div class="col-sm-10">
                                    <textarea className="form-control" type="text" id="comment" value={state.comment} name="comment" size="50" onChange={(e) => onChangeInput(e)} />
                                </div>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={onChangeFile} /> <button className="btn btn-sm btn-primary rounded-0" onClick={() => onClickFileUpload()}> Upload </button>
                            <br /><br />
                            <button className="btn btn-sm btn-primary rounded-0" onClick={onSubmit}> Send </button>
                            <button className="btn btn-sm btn-secondary rounded-0" onClick={onReset}> Reset </button></div>
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
