import { Container } from "../../common/container/container";
import "./header.scss";

const BASE_CLASS = "header";

export function Header() {
  return (
    <header className={BASE_CLASS}>
      <Container className={`${BASE_CLASS}__container`}>
        <a href="/">
          <h2 className={`${BASE_CLASS}__logo`}>Medium</h2>
        </a>
      </Container>
    </header>
  );
}
