import { useState, useEffect } from 'react';
import useCalculateRoute from "../hooks/useCalculateRoute";
import { Input, Button, Card, Typography, Form } from 'antd';

function ChessboardDroneRoute() {
    const [form] = Form.useForm();
    const [origin, setOrigin] = useState('');
    const [collection, setCollection] = useState('');
    const [destination, setDestination] = useState('');
    const [movementTimes, setMovementTimes] = useState({});
    const [showResults, setShowResults] = useState(false);
    const {Text } = Typography;
    const [delivery, setDelivery] = useState([]);

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

    const formatString = () => {
        return `– From ${origin}, picking-up at ${collection} to ${destination} in ${totalTime.toFixed(2)} seconds`;
    };

    const { path, totalTime } = useCalculateRoute(origin, collection, destination, movementTimes);

    const handleCalculateClick = () => {
        setDelivery([formatString(), ...delivery]);
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
            <Form form={form}>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: "Origin is mandatory",
                        },
                    ]}
                >
                    <Input
                        placeholder="Origin (A1-H8)"
                        type="text"
                        size="small"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                        style={{ width: '400px', display: 'block', background: 'floralwhite' }}
                        onClick={handleDisableResults}
                    />
                </Form.Item>

                <Form.Item

                >
                    <Input
                        placeholder="Pickup (A1-H8)"
                        type="text"
                        size="small"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value.toUpperCase())}
                        style={{ width: '400px', display: 'block', background: 'floralwhite' }}
                        onClick={handleDisableResults}
                    />
                </Form.Item>

                <Form.Item

                >
                    <Input
                        placeholder="Destination (A1-H8)"
                        type="text"
                        size="small"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value.toUpperCase())}
                        style={{ width: '400px', marginBottom: '10px', display: 'block', background: 'floralwhite' }}
                        onClick={handleDisableResults}
                    />
                </Form.Item>

                <Button
                    onClick={handleCalculateClick}
                    type="primary"
                    style={{ width: '400px', marginBottom: '10px', display: 'block' }}
                >
                    Calculate fastest route!
                </Button>

                {showResults && (
                    <>
                    <Card title="Route Results" style={{width: '100%', marginBottom: '10px', maxWidth: '400px', background: 'floralwhite'}}>
                        <Text>The set delivery will have the route: <strong>{path.join('-')}</strong></Text>
                        <br/>
                        <Text>, and will take <strong>{totalTime.toFixed(2)} seconds</strong> to be delivered as fast as
                            possible.</Text>
                    </Card>
                    <Card title="Last deliverieas" style={{width: '100%', maxWidth: '400px', background: 'floralwhite'}}>
                        <ul>
                            {delivery.slice(0, 10).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </Card>
                    </>
                )}
            </Form>
        </div>
    );
}

export default ChessboardDroneRoute;
