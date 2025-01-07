import { ReactNode } from "react";
import { Header } from "../../components/layouts/header/header";

type Props = {
  children: ReactNode;
};

export function RootLayout({ children }: Props) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
