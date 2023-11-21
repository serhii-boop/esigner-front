import { useEffect, useState } from "react";
import {getWorkers} from "../services/main";
import Cookies from "js-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { WorkerType } from "../types/main";
import { WorkersTable } from "../components/workers/WorkersTable";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const [email, setEmail] = useState<string>('');
    const token = Cookies.get('jwt-token');
    const navigate = useNavigate();

    useEffect(() => {
      if(token) {
        const decoded: JwtPayload = jwtDecode(token);
        setEmail(decoded.sub as string);
      }
    }, [token]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        await getWorkers().then((data) => {
          setWorkers(data)
        });
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, [email]);

  useEffect(() => {
   setFilteredWorkers(workers.filter((worker: WorkerType) => worker.email !== email));
  }, [workers, email]);
    
  return (
        <div>
            <h1>Сторінка працівників</h1>
          <Button
            variant="contained"
            sx={{
              marginBottom: 2
            }}
            onClick={() => navigate('/add')}
          >Додати нового працівника</Button>
            <WorkersTable workers={filteredWorkers} />
        </div>
    )
}