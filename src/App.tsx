import { Providers } from "./contexts/providers";
import { RootLayout } from "./layouts/root-layout/root-layout";
import { Home } from "./pages/home/home";

function App() {
  return (
    // step.3 provide the context - wrap components where context is needed
    <Providers>
      <RootLayout>
        <Home />
      </RootLayout>
    </Providers>
  );
}

export default App;
