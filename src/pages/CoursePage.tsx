import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { usePage } from "../hooks/PageContext";
import { Error404 } from "./Error404";
import { Course } from "../components/Types";
import ModuleListComponent from "../components/ModuleList/ModuleListComponent";

export const CoursePage = () => {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useFetch<Course>(`/api/courses/${id}`);
    const { setPage, setCourse, setModule } = usePage();
    
    useEffect(() => {
        if (data) {
            setPage({name: data.name, id: data.id});
            setCourse({name: data.name, id: data.id});
            setModule();
        }
    }, [data, setPage, setCourse, setModule]);    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    if (id) {
        return <ModuleListComponent courseId={id} />;
    } else {
        return <Error404/>
    }
}