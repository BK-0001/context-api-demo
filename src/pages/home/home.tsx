import { useState } from "react";
import { Container } from "../../components/common/container/container";
import { ArticleList } from "../../components/features/articles/article-list/article-list";
import { ARTICLES } from "../../mockData/articles";
import "./home.scss";

export function Home() {
  const [articles, setArticle] = useState(ARTICLES);
  return (
    <main>
      <Container>
        <ArticleList articles={articles} />
      </Container>
    </main>
  );
}
