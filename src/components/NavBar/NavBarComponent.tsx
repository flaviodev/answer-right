import { FaArrowLeft } from "react-icons/fa";
import { NavbarContainer, Title, BackButton } from "./NavBar.styled";
import { usePage } from "../../hooks/PageContext";

export const NavBarComponent = () => {
  const { page } = usePage();

  const handleBack = () => {
    window.history.back(); 
  };
  
  return (
    <NavbarContainer>
      <BackButton onClick={handleBack}>
        <FaArrowLeft />
      </BackButton>
      <Title>{page}</Title>
    </NavbarContainer>
  );
};
