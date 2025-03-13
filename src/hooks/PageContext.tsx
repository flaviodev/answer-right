import { createContext, useContext, useState } from "react";
import { Item } from "../components/Types";

interface PageContextType {
  page?: Item;  
  course?: Item;
  module?: Item;
  setPage: (page?: Item) => void;
  setCourse: (course?: Item) => void;
  setModule: (module?: Item) => void;
}

// Criando o contexto com valores iniciais
const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({children} : {children: any}) => {
  const [page, setPage] = useState<Item|undefined>();
  const [course, setCourse] = useState<Item|undefined>();
  const [module, setModule] = useState<Item|undefined>();

  return (
    <PageContext.Provider value={{ page, course, module, setPage, setCourse, setModule }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
};

