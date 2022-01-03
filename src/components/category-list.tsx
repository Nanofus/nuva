import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { alphabeticalSort, buildTaxonomyTree } from "../util";
import CategoryNode from "./category-node";

const CategoryList = () => {
  const categories = useStaticQuery(graphql`
    query CategoriesQuery {
      allWpCategory {
        edges {
          node {
            name
            id
            parentId
            slug
          }
        }
      }
    }
  `);
  const categoryTree = buildTaxonomyTree(categories.allWpCategory.edges.map(edge => edge.node), alphabeticalSort);

  return (
    <div className="categories window">
      {categoryTree.map((category, i) => (
        <CategoryNode category={category} key={i} />
      ))}
    </div>
  );
};

export default CategoryList;
