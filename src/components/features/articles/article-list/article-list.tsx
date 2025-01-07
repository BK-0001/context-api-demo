import { Article } from "../../../../types/articles";
import { ArticleItem } from "../article-item/article-item";

type Props = {
  articles: Article[];
};

export function ArticleList({ articles }: Props) {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  );
}
