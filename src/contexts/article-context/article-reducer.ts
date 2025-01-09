import { Reducer } from "react";
import { Article } from "../../types/articles";
import { ARTICLE_ACTION_TYPE, ArticleAction } from "./article-actions";

export const articleReducer: Reducer<Article[], ArticleAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case ARTICLE_ACTION_TYPE.INIT:
      return [...action.payload.articles];

    case ARTICLE_ACTION_TYPE.CREATE:
      return [...prevState, action.payload.article];

    case ARTICLE_ACTION_TYPE.EDIT:
      return prevState.map((article) =>
        article.id === action.payload.updatedArticle.id
          ? action.payload.updatedArticle
          : article
      );

    case ARTICLE_ACTION_TYPE.DELETE:
      return prevState.filter(
        (article) => article.id !== action.payload.deletedId
      );

    default:
      return prevState;
  }
};
