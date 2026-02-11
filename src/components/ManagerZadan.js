import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerZadan = () => {
    // fetch tasks and update tasks state
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
            setTasks(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setErrorMessage("Wystąpił błąd");
            setIsLoading(false);
        }
    };



    useEffect(() => {
        fetchTasks();
    }, []);
    
    if (isLoading) return <p>Ładowanie danych...</p>;
    if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;

    return (
        <div>
            <h2>Task Manager</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} style={{ color: task.completed ? 'green' : 'black' }}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.completed ? 'Zakończone' : 'W trakcie'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerZadan;