import { FaArrowLeft } from "react-icons/fa";
import { NavbarContainer, Title, BackButton } from "./NavBar.styled";
import { usePage } from "../../hooks/PageContext";
import { useLocation } from "react-router-dom";

export const NavBarComponent = () => {
  const { page } = usePage();

  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleBack = () => {
    window.history.back(); 
  };
  
  return (
    <NavbarContainer>
      { !isHome && 
        <BackButton onClick={handleBack}>
          <FaArrowLeft />
        </BackButton>
      }
      <Title>{page?.name}</Title>
    </NavbarContainer>
  );
};
