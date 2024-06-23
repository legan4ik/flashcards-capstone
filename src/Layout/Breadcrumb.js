import React from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
//state

function BreadCrumb({items = []}){
/*const 
#console.log(location);
#let breadcrumb = `
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
    </ol>
    </nav>
`
//return (breadcrumb);
let items = `<li class="breadcrumb-item"><a href="#">Library</a></li>`
console.log(`items: ${items}`)
*/
//const location = useLocation();
//let links = {
//    home: "/"
//}   aria-current={(last) ? "page" : "page"}                     <li class="breadcrumb-item active" aria-current="page">Data</li>

//<Routes>
//        <Route path="" element={
//        }>
//        </Route>
//    </Routes>
return (
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    {items.map(({name, link, last})=> <li className={(!last) ? "breadcrumb-item" : "breadcrumb-item active"} aria-current={(!last) ? "" : "page"} >{(!last) ? <a href={link}>{name}</a> : <span>{name}</span>}</li>)}
                </ol>
            </nav>
)

}

export default BreadCrumb;

/*
return (
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        {
            
        }
    </ol>
    </nav>
)
*/