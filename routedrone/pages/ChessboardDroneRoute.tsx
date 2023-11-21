import { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import useCalculateRoute from "../hooks/useCalculateRoute";

function ChessboardDroneRoute() {
    const [origin, setOrigin] = useState('');
    const [collection, setCollection] = useState('');
    const [destination, setDestination] = useState('');
    const [movementTimes, setMovementTimes] = useState({});

    useEffect(() => {
        // @ts-ignore
        async function fetchMovementTimes() {
            try {
                const response = await fetch('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMovementTimes(data);
            } catch (error) {
                console.error("Failed to fetch movement times", error);
            }
        }

        fetchMovementTimes();
    }, []);

    //Using hook to calculete the route
    const { path, totalTime } = useCalculateRoute(origin, collection, destination, movementTimes);

    return (
        <div>
            <input
                type="text"
                placeholder="Origem (A1-H8)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Coleta (A1-H8)"
                value={collection}
                onChange={(e) => setCollection(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Destino (A1-H8)"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
            />
            <Chessboard
                width={400}
                position={{}}
                boardStyle={{
                    borderRadius: '5px',
                    boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                }}
            />
            <p>Rota mais rápida: {path.join(' -> ')}</p>
            <p>Tempo total: {totalTime} minutos</p>
        </div>
    );
}

export default ChessboardDroneRoute;
