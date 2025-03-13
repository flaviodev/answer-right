
import { BreadcrumbContainer, Crumb } from "./Breadcrumb.style";
import { usePage } from "../../hooks/PageContext";

const Breadcrumb: React.FC = () => {
  const { course, module } = usePage(); // Consumindo o contexto

  return (
    <BreadcrumbContainer>
      <Crumb>{course}</Crumb>
      <Crumb>{module}</Crumb>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
