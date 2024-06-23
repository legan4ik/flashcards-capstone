import React from "react";

function BreadCrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {items.map(({ name, link, last }) => (
          <li
            className={!last ? "breadcrumb-item" : "breadcrumb-item active"}
            aria-current={!last ? "" : "page"}
          >
            {!last ? <a href={link}>{name}</a> : <span>{name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
