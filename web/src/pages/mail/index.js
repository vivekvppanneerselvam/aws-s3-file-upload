import React, { useState, useEffect } from "react";

function Mail(props) {


    return (
        <div>
            Name:<br />
            <input type="text" name="name" /><br />
            E-mail:<br />
            <input type="text" name="mail" /><br />
            Comment:<br />
            <input type="text" name="comment" size="50" /><br /><br />
            <button className="btn btn-primary"> Send </button>
            <button className="btn btn-secondary"> Reset </button>
        </div>
    )
}


export default Mail
