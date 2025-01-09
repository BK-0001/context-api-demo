import { ReactNode } from "react";
import { ArticleContextProvider } from "./article-context/article-context";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return <ArticleContextProvider>{children}</ArticleContextProvider>;
}
