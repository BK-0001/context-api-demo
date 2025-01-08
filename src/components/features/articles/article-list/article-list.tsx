import { FormEvent } from "react";
import { Article } from "../../../../types/articles";
import { ArticleItem } from "../article-item/article-item";

type Props = {
  articles: Article[];
  onDelete: (id: Article["id"]) => void;
  onEdit: (
    event: FormEvent<HTMLFormElement>,
    id: Article["id"],
    title: string,
    description: string
  ) => void;
};

export function ArticleList({ articles, onEdit, onDelete }: Props) {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          article={article}
          onEdit={onEdit}
          onDelete={() => onDelete(article.id)}
        />
      ))}
    </ul>
  );
}
