import React from "react";


export default function Payment({open, children, onClose}){
    if (!open) return null
    return(
        <div> 
            {children}
        </div>
    )
}