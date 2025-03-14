import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePage } from "../hooks/PageContext";
import { useFetch } from "../hooks/useFetch";
import { Module } from "../components/Types";
import { Error404 } from "./Error404";
import LessonList from "../components/List/LessonList/LessonList";

export const ModulePage = () => {
    const params = useParams();
    const id = params.id;

    const { data, error, isLoading } = useFetch<Module>(`/api/modules/${id}`);
    const { setPage, setCourse, setModule } = usePage();
    
    useEffect(() => {
        if (data) {
            setPage({name: data.name, id: data.id});
            setModule({name: data.name, id: data.id});
        }
    }, [data, setPage, setCourse, setModule]);    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    if (id) {
        return <LessonList moduleId={id} />;
    } else {
        return <Error404/>
    }
}