import { useArticleContext } from "../../../../contexts/article-context/article-context";
import { ArticleItem } from "../article-item/article-item";

export function ArticleList() {
  const { articles } = useArticleContext();

  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </ul>
  );
}
