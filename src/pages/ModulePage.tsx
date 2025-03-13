import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "../hooks/PageContext";
import { useFetch } from "../hooks/useFetch";
import { Module } from "../components/Types";
import { Error404 } from "./Error404";
import LessonListComponent from "../components/LessonList/LessonListComponent";

export const ModulePage = () => {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useFetch<Module>(`/api/modules/${id}`);
    const { page, setPage, setCourse, setModule } = usePage();
    
    useEffect(() => {
        if (data) {
            setPage(data.name);
            setModule(data.name);
        }
    }, [data, page, setPage, setCourse, setModule]);    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    if (id) {
        return <LessonListComponent moduleId={id} />;
    } else {
        return <Error404/>
    }
}