import { ArticleContextProvider } from "./contexts/article-context/article-context";
import { RootLayout } from "./layouts/root-layout/root-layout";
import { Home } from "./pages/home/home";

function App() {
  return (
    // step.3 provide the context - wrap components where context is needed
    <ArticleContextProvider>
      <RootLayout>
        <Home />
      </RootLayout>
    </ArticleContextProvider>
  );
}

export default App;
