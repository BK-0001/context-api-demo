import { Article } from "../../../../types/articles";
import { ArticleItem } from "../article-item/article-item";

type Props = {
  articles: Article[];
  onDelete: (id: Article["id"]) => void;
};

export function ArticleList({ articles, onDelete }: Props) {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          onDelete={() => onDelete(article.id)}
        />
      ))}
    </ul>
  );
}
