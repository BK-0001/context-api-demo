import { useState } from "react";
import { useArticleContext } from "../../../../contexts/article-context/article-context";
import { Article } from "../../../../types/articles";
import { ArticleItem } from "../article-item/article-item";

export function ArticleList() {
  const { articles } = useArticleContext();
  const [idInEditMode, setIdInEditMode] = useState<Article["id"] | null>(null);

  const handleToggle = (articleId: Article["id"]) => {
    if (idInEditMode === articleId) {
      setIdInEditMode(null);
    } else {
      setIdInEditMode(articleId);
    }
  };

  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          isEditing={idInEditMode === article.id}
          onToggleEdit={() => handleToggle(article.id)}
        />
      ))}
    </ul>
  );
}
