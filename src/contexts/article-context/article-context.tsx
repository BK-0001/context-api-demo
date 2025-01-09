// step.1 create context

import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useReducer
} from "react";
import { Article } from "../../types/articles";
import {
  createArticle,
  deleteArticle,
  editArticle,
  initArticles
} from "./article-actions";
import { articleReducer } from "./article-reducer";

type ArticleContextType = {
  articles: Article[];
  create: (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
  ) => void;
  edit: (
    event: FormEvent<HTMLFormElement>,
    id: Article["id"],
    title: string,
    description: string
  ) => void;
  remove: (id: Article["id"]) => void;
};

const INITIAL_CONTEXT = {
  articles: [],
  create: () => {},
  edit: () => {},
  remove: () => {}
} satisfies ArticleContextType;

const ArticleContext = createContext<ArticleContextType>(INITIAL_CONTEXT);

// step.2 create provider

type Props = {
  children: ReactNode;
};

export const ArticleContextProvider = ({ children }: Props) => {
  const [articles, dispatch] = useReducer(articleReducer, []);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(
        "http://localhost:8000/articles?_expand=author&_embed=comments"
      );

      if (!response.ok) {
        throw new Error("Something has gone wrong while getting the articles");
      }

      const data = await response.json();

      dispatch(initArticles(data));
    };

    getArticles();
  }, []);

  const create = async (
    event: FormEvent<HTMLFormElement>,
    title: string,
    description: string
  ) => {
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

    dispatch(createArticle(article));
  };

  const edit = async (
    event: FormEvent<HTMLFormElement>,
    id: Article["id"],
    title: string,
    description: string
  ) => {
    event.preventDefault();

    const data: Partial<Article> & {
      authorId?: string;
    } = {
      title,
      description
    };

    const response = await fetch(`http://localhost:8000/articles/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Something wrong while updating article with id ${id}`);
    }

    const updatedArticle = await response.json();

    // update state
    dispatch(editArticle(updatedArticle));
  };

  const remove = async (id: Article["id"]) => {
    const response = await fetch(`http://localhost:8000/articles/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(
        `something has gone wrong while deleting article with id ${id}`
      );
    }

    dispatch(deleteArticle(id));
  };

  return (
    <ArticleContext.Provider value={{ articles, create, edit, remove }}>
      {children}
    </ArticleContext.Provider>
  );
};

// step.4 use and consume the context
// build small custom hook
export const useArticleContext = () => useContext(ArticleContext);
