import { useState } from "react";
import { Container } from "../../components/common/container/container";
import { ArticleForm } from "../../components/features/articles/article-form/article-form";
import { ArticleList } from "../../components/features/articles/article-list/article-list";
import { useArticleContext } from "../../contexts/article-context/article-context";
import "./home.scss";

export function Home() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { create } = useArticleContext();

  return (
    <main>
      <Container>
        <ArticleForm
          title={title}
          description={description}
          onSubmit={(e) => create(e, title, description)}
          onTitleChange={(event) => setTitle(event.target.value)}
          onDescriptionChange={(event) => setDescription(event.target.value)}
        />

        <ArticleList />
      </Container>
    </main>
  );
}
