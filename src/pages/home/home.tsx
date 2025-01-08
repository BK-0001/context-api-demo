import { FormEvent, useEffect, useState } from "react";
import { Container } from "../../components/common/container/container";
import { AddArticleForm } from "../../components/features/articles/add-article-form/add-article-form";
import { ArticleList } from "../../components/features/articles/article-list/article-list";
import { Article } from "../../types/articles";
import "./home.scss";

export function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(
        "http://localhost:8000/articles?_expand=author&_embed=comments"
      );

      if (!response.ok) {
        throw new Error("Something has gone wrong while getting the articles");
      }

      const data = await response.json();

      setArticles(data);
    };

    getArticles();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: Omit<Article, "id" | "comments" | "author"> & {
      authorId: string;
    } = {
      title,
      description,
      authorId: "1",
      createdAt: new Date().toLocaleDateString("us-en", {
        dateStyle: "medium"
      }),
      likes: 0,
      thumbnail:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQluFl3GfQDXohBaH-xG3GuRi8T4MDIQPRpCqUGLiE5tXdXbUO0hRFwnshvzg07igEgGg7i"
    };

    const response = await fetch(
      "http://localhost:8000/articles?_expand=author&_embed=comments",
      {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Something wrong while creating article");
    }

    const article: Article = await response.json();

    setArticles((prevState) => [...prevState, article]);
  };

  const handleDelete = async (id: Article["id"]) => {
    const response = await fetch(`http://localhost:8000/articles/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(
        `something has gone wrong while deleting article with id ${id}`
      );
    }

    // update state
    setArticles((prevState) =>
      prevState.filter((article) => article.id !== id)
    );
  };

  return (
    <main>
      <Container>
        <AddArticleForm
          title={title}
          description={description}
          onSubmit={handleSubmit}
          onTitleChange={(event) => setTitle(event.target.value)}
          onDescriptionChange={(event) => setDescription(event.target.value)}
        />
        <ArticleList articles={articles} onDelete={handleDelete} />
      </Container>
    </main>
  );
}
