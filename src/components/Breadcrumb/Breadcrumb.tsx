
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbContainer, Crumb } from "./Breadcrumb.style";
import { usePage } from "../../hooks/PageContext";

const Breadcrumb = () => {
  const { course, module } = usePage(); 

  const location = useLocation();
  const isUsers = location.pathname === "/users";

  if (isUsers) return;

  return (
    <BreadcrumbContainer>
      <Crumb><Link to={`/`} style={{ textDecoration: "none" }}>Cursos</Link></Crumb>
      {course && <Crumb><Link to={`/courses/${course?.id}`} style={{ textDecoration: "none" }}>{course?.name}</Link></Crumb>}
      {module && <Crumb><Link to={`/modules/${module?.id}`} style={{ textDecoration: "none" }}>{module?.name}</Link></Crumb>}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
