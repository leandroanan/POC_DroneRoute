import { useState, useEffect } from 'react';
import useCalculateRoute from "../hooks/useCalculateRoute";
import { Input, Button, Card, Typography } from 'antd';

function ChessboardDroneRoute() {
    const [origin, setOrigin] = useState('');
    const [collection, setCollection] = useState('');
    const [destination, setDestination] = useState('');
    const [movementTimes, setMovementTimes] = useState({});
    const [showResults, setShowResults] = useState(false);
    const { Title, Text } = Typography;

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

    const { path, totalTime } = useCalculateRoute(origin, collection, destination, movementTimes);

    const handleCalculateClick = () => {
        //setShouldCalculate(true);
        setShowResults(true);
        setOrigin("");
        setCollection("");
        setDestination("");
    };

    const handleDisableResults = () => {
        setShowResults(false);
    }

    return (
        <div>
            <Input
                placeholder="Origem (A1-H8)"
                type="text"
                size="small"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                style={{ width: '100%', maxWidth: '400px', marginBottom: '10px', display: 'block' }}
                onClick={handleDisableResults}
            />
            <Input
                placeholder="Coleta (A1-H8)"
                type="text"
                size="small"
                value={collection}
                onChange={(e) => setCollection(e.target.value.toUpperCase())}
                style={{ width: '100%', maxWidth: '400px', marginBottom: '10px', display: 'block' }}
                onClick={handleDisableResults}
            />
            <Input
                placeholder="Destino (A1-H8)"
                type="text"
                size="small"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                style={{ width: '100%', maxWidth: '400px', marginBottom: '10px', display: 'block' }}
                onClick={handleDisableResults}
            />
            <Button
                onClick={handleCalculateClick}
                type="primary"
                style={{ width: '100%', maxWidth: '400px', marginBottom: '20px', display: 'block' }}
            >
                Calcular Rota
            </Button>
            {showResults && (
                <Card title="Route Results" style={{ width: '100%', maxWidth: '400px' }}>
                    <Text>The set delivery will have the route: <strong>{path.join('-')}</strong></Text>
                    <br />
                    <Text>, and will take <strong>{totalTime} seconds</strong> to be delivered as fast as possible.</Text>
                </Card>
            )}
        </div>
    );
}

export default ChessboardDroneRoute;
