import {getCourse, getCourseParticipants} from "../../services/main";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ParticipantType} from "../../types/main";
import {ParticipantsTable} from "../../components/participant/ParticipantTable";

export const CourseParticipant = () => {
  const { id } = useParams();
  const [courseName, setCourseName] = useState('');
  const [unassignedParticipants, setUnassignedParticipants] = useState<ParticipantType[]>([]);
  const [assignedParticipants, setAssignedParticipants] = useState<ParticipantType[]>([]);

  const fetchCourseName = async () => {
    try {
      await getCourse(id as string).then((data) => {
        setCourseName(data.courseName)
      });
    } catch (error) {
      console.error("Error fetching course name:", error);
    }
  }
  const fetchCourseParticipants = async () => {
    try {
      getCourseParticipants(id as string).then((data) => {
        setUnassignedParticipants(data.false);
        setAssignedParticipants(data.true);
      });
    } catch (error) {
      console.error("Error fetching course participants:", error);
    }

  }

  useEffect(() => {
    fetchCourseName();
    fetchCourseParticipants();
  }, []);

  return (
  <div>
    <h1>Учасники курсу "{courseName}"</h1>
    <ParticipantsTable unassignedParticipants={unassignedParticipants} assignedParticipants={assignedParticipants}/>
    </div>
  )};