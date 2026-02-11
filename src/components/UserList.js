import React, { useState, useEffect } from 'react';
import axios from 'axios';
const UserList = () => {

    // R.1.4: Znaczące nazwy stanów
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // R.1.3: Znacząca nazwa funkcji asynchronicznej
    
    const fetchUsersData = async () => {
        try {
            const response = await
            axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas pobierania danych.");
            setIsLoading(false);
            console.error(error); // Pomocne przy debugowaniu
        }
    };
    
    useEffect(() => {
        fetchUsersData();
    }, []);
    
    if (isLoading) return <p>Ładowanie danych...</p>;
    if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;


    return (
        <section>
            <h2>Lista Użytkowników</h2>
            <ul>
                {users.map((user) => (
                    // Pamiętaj o kluczu i czytelności JSX
                    <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email}
                    </li>
                ))}
            </ul>
        </section>
    );
};
export default UserList;