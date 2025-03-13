
import { Link } from "react-router-dom";
import { BreadcrumbContainer, Crumb } from "./Breadcrumb.style";
import { usePage } from "../../hooks/PageContext";

const Breadcrumb: React.FC = () => {
  const { course, module } = usePage(); // Consumindo o contexto

  return (
    <BreadcrumbContainer>
      <Crumb><Link to={`/`} style={{ textDecoration: "none" }}>Cursos</Link></Crumb>
      {course && <Crumb><Link to={`/courses/${course?.id}`} style={{ textDecoration: "none" }}>{course?.name}</Link></Crumb>}
      {module && <Crumb><Link to={`/modules/${module?.id}`} style={{ textDecoration: "none" }}>{module?.name}</Link></Crumb>}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
