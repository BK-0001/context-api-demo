import { Article } from "../../../../types/articles";
import "./article-item.scss";

type Props = {
  article: Article;
};

const BASE_CLASS = "article-item";

export function ArticleItem({ article }: Props) {
  return (
    <li className={BASE_CLASS}>
      {article.author && (
        <div className={`${BASE_CLASS}__author`}>
          <div className="avatar">
            <img
              src={article.author.avatar}
              alt={`author ${article.author.name} image`}
            />
          </div>
          <p>{article.author.name}</p>
        </div>
      )}
      <div className={`${BASE_CLASS}__contents`}>
        <div className={`${BASE_CLASS}__texts`}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
        <div className={`${BASE_CLASS}__img`}>
          <img
            src={article.thumbnail}
            alt={`image about the article ${article.title}`}
          />
        </div>
      </div>
      <div className={`${BASE_CLASS}__additional-info`}>
        <p>{article.createdAt}</p>
        <div>icon {article.likes}</div>
        <div>icon {article.comments?.length || 0}</div>
      </div>
    </li>
  );
}
