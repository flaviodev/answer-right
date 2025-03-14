import { useEffect } from "react";
import CourseList from "../components/List/CourseList/CourseList";
import { usePage } from "../hooks/PageContext";

export const HomePage = () => {
    const { setPage, setCourse, setModule } = usePage();

    useEffect(() => {
        setPage({name : "Meus Cursos", id: 0});
        setCourse();
        setModule();
    }, [setPage, setCourse, setModule]);

    return <CourseList />;
}