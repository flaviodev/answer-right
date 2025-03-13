import { createContext, useContext, useState } from "react";

interface PageContextType {
  page?: string;  
  course?: string;
  module?: string;
  setPage: (page?: string) => void;
  setCourse: (course?: string) => void;
  setModule: (module?: string) => void;
}

// Criando o contexto com valores iniciais
const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({children} : {children: any}) => {
  const [page, setPage] = useState<string|undefined>();
  const [course, setCourse] = useState<string|undefined>();
  const [module, setModule] = useState<string|undefined>();

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

