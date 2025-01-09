import { FormEvent, useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { useArticleContext } from "../../../../contexts/article-context/article-context";
import { Article } from "../../../../types/articles";
import { ArticleForm } from "../article-form/article-form";
import "./article-item.scss";

type Props = {
  article: Article;
  isEditing: boolean;
  onToggleEdit: () => void;
};

const BASE_CLASS = "article-item";

export function ArticleItem({ article, isEditing, onToggleEdit }: Props) {
  const { edit, remove } = useArticleContext();

  const [title, setTitle] = useState<string>(article.title);
  const [description, setDescription] = useState<string>(article.description);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    edit(e, article.id, title, description);
  };

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
        {isEditing ? (
          <ArticleForm
            title={title}
            description={description}
            onTitleChange={(e) => setTitle(e.target.value)}
            onDescriptionChange={(e) => setDescription(e.target.value)}
            onSubmit={handleSubmit}
          />
        ) : (
          <div className={`${BASE_CLASS}__texts`}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        )}
        <div className={`${BASE_CLASS}__img`}>
          <img
            src={article.thumbnail}
            alt={`image about the article ${article.title}`}
          />
        </div>
      </div>
      <div className={`${BASE_CLASS}__footer`}>
        <div className={`${BASE_CLASS}__additional-info`}>
          <p>{article.createdAt}</p>
          <div>icon {article.likes}</div>
          <div>icon {article.comments?.length || 0}</div>
        </div>
        <div className={`${BASE_CLASS}__actions`}>
          <button className="button" onClick={onToggleEdit}>
            <MdModeEdit />
          </button>
          <button className="button" onClick={() => remove(article.id)}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </li>
  );
}
