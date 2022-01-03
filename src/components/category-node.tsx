import { Link } from "gatsby";
import React from "react";

const CategoryNode = ({ category }) => {
  return (
    <div className="categoryNode">
      <Link to={"/category/" + category.slug}>{category.name}</Link>
      <div className="childCategories">
        {category.children &&
          category.children.map((category, i) => <CategoryNode category={category} key={i} />)}
      </div>
    </div>
  )
}

export default CategoryNode;