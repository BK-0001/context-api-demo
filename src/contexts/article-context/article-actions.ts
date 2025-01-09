import { Article } from "../../types/articles";

export enum ARTICLE_ACTION_TYPE {
  INIT,
  CREATE,
  EDIT,
  DELETE
}

export type ArticleAction =
  | { type: ARTICLE_ACTION_TYPE.INIT; payload: { articles: Article[] } }
  | { type: ARTICLE_ACTION_TYPE.CREATE; payload: { article: Article } }
  | { type: ARTICLE_ACTION_TYPE.EDIT; payload: { updatedArticle: Article } }
  | {
      type: ARTICLE_ACTION_TYPE.DELETE;
      payload: { deletedId: Article["id"] };
    };

export const initArticles = (articles: Article[]): ArticleAction => ({
  type: ARTICLE_ACTION_TYPE.INIT,
  payload: { articles }
});

export const createArticle = (article: Article): ArticleAction => ({
  type: ARTICLE_ACTION_TYPE.CREATE,
  payload: { article }
});

export const editArticle = (updatedArticle: Article): ArticleAction => ({
  type: ARTICLE_ACTION_TYPE.EDIT,
  payload: { updatedArticle }
});

export const deleteArticle = (deletedId: Article["id"]): ArticleAction => ({
  type: ARTICLE_ACTION_TYPE.DELETE,
  payload: { deletedId }
});
