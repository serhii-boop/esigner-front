import {getCourses} from "../../services/main";
import {useEffect, useState} from "react";
import {CoursesTable} from "../../components/courses/CoursesTable";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const navigate = useNavigate();

  const  fetchCourses = async () => {
    try {
      await getCourses().then((data) => {
        setCourses(data);
      });
    } catch (error) {
       toast.error('Помилка завантаження курсів');
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

    return (
        <div>
            <h1>Курси</h1>
          <Button
            variant="contained"
            sx={{
              marginBottom: 2
            }}
            onClick={() => navigate('/add-course')}
          >Додати новий курс</Button>
           <CoursesTable courses={courses} />
        </div>
    )
}