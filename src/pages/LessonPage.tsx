import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { usePage } from "../hooks/PageContext";
import { Lesson } from "../components/Types";
import { Error404 } from "./Error404";
import LessonComponent from "../components/Lesson/LessonComponent";

export const LessonPage = () => {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useFetch<Lesson>(`/api/lessons/${id}`);
    const { setPage, setCourse, setModule } = usePage();
    
    useEffect(() => {
        if (data) {
            setPage(data.name);
        }
    }, [data, setPage, setCourse, setModule]);    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    if (id) {
        return <LessonComponent lessonId={id} />;
    } else {
        return <Error404/>
    }
}