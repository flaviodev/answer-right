import { useEffect } from "react";
import CourseList from "../components/CourseList/CourseList";
import { usePage } from "../hooks/PageContext";

export const HomePage = () => {
    const { setPage, setCourse, setModule } = usePage();

    useEffect(() => {
        setPage("Meus Cursos");
        setCourse();
        setModule();
    }, [setPage, setCourse, setModule]);

    return <CourseList />;
}