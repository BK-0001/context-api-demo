import { Container } from "../../components/common/container/container";
import { ArticleList } from "../../components/features/articles/article-list/article-list";
import "./home.scss";

export function Home() {
  return (
    <main>
      <Container>
        <ArticleList />
      </Container>
    </main>
  );
}
