import { FormEvent, useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Article } from "../../../../types/articles";
import { ArticleForm } from "../article-form/article-form";
import "./article-item.scss";

type Props = {
  article: Article;
  onDelete: () => void;
  onEdit: (
    event: FormEvent<HTMLFormElement>,
    id: Article["id"],
    title: string,
    description: string
  ) => void;
};

const BASE_CLASS = "article-item";

export function ArticleItem({ article, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(article.title);
  const [description, setDescription] = useState<string>(article.description);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onEdit(e, article.id, title, description);
    setIsEditing(false);
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
          <button
            className="button"
            onClick={() => setIsEditing((prevState) => !prevState)}
          >
            <MdModeEdit />
          </button>
          <button className="button" onClick={onDelete}>
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </li>
  );
}
