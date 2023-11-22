import { useState, useEffect } from 'react';
import useCalculateRoute from "../hooks/useCalculateRoute";
import { Input, Button, Card, Typography, Form } from 'antd';

function ChessboardDroneRoute() {
    const [form] = Form.useForm();
    const [origin, setOrigin] = useState('');
    const [originError, setOriginError] = useState(false);
    const [collection, setCollection] = useState('');
    const [collectionError, setCollectionError] = useState(false);
    const [destination, setDestination] = useState('');
    const [destinationError, setDestinationError] = useState(false);
    const [movementTimes, setMovementTimes] = useState({});
    const [showResults, setShowResults] = useState(false);
    const {Text } = Typography;
    const [delivery, setDelivery] = useState([]);
    const [originErrorMsg, setOriginErrorMsg] = useState("");
    const [collectionErrorMsg, setCollectionErrorMsg] = useState("");
    const [destinationErrorMsg, setDestinationErrorMsg] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const formatDeliveryMessage = () => {
        return `From ${origin}, picking-up at ${collection} to ${destination} in ${totalTime.toFixed(0)} seconds`;
    };

    const { path, totalTime } = useCalculateRoute(origin, collection, destination, movementTimes);

    const handleChange = (e, fieldName) => {
        const value = e.target.value.toUpperCase();
        const inputValue = e.target.value.toUpperCase();

        if (/^[A-H]?[1-8]?$/.test(inputValue) == false) {
            if (fieldName === "origin") {
                setOrigin("");
                setOriginError(true);
                setOriginErrorMsg("Invalid position, type (A1-H8)");
            } else if (fieldName === "collection") {
                setCollection("");
                setCollectionError(true);
                setCollectionErrorMsg("Invalid position, type (A1-H8)");
            } else if (fieldName === "destination") {
                setDestination("");
                setDestinationError(true);
                setDestinationErrorMsg("Invalid position, type (A1-H8)");
            }
            return;
        }

        if (fieldName === "origin") {
            setOrigin(value);
            setOriginError(!value);
            setOriginErrorMsg("Origin is mandatory")
        } else if (fieldName === "collection") {
            setCollection(value);
            setCollectionError(!value);
            setCollectionErrorMsg("Pickup is mandatory");
        } else if (fieldName === "destination") {
            setDestination(value);
            setDestinationError(!value);
            setDestinationErrorMsg("Destination is mandatory");
        }
    };

    const handleValidationClick = () => {
        let ret = true;

        if (!origin) {
            setOriginError(true);
            setOriginErrorMsg("Origin is mandatory")
            ret = false;
        }

        if (!collection) {
            setCollectionError(true);
            setCollectionErrorMsg("Pickup is mandatory");
            ret = false;
        }

        if (!collection) {
            setDestinationError(true);
            setDestinationErrorMsg("Destination is mandatory");
            ret = false;
        }

        return ret;
    };

    const handleCalculateClick = () => {
        if (handleValidationClick()) {
            setDelivery([formatDeliveryMessage(), ...delivery]);
            setShowResults(true);
            setOrigin("");
            setCollection("");
            setDestination("");
        }
    };

    const handleDisableResults = () => {
        setShowResults(false);
    }

    return (
        <div>
            <Form form={form}>
                <Form.Item
                    label="Origin"
                    labelCol={{ span: windowWidth <= 700 ? 24 : 4 }}
                    wrapperCol={{ span: windowWidth <= 700 ? 24 : 20 }}
                    validateStatus={originError ? "error" : ""}
                    help={originError ? "" : ""}
                >
                    <Input
                        placeholder={originError ? originErrorMsg : "Origin (A1-H8)"}
                        type="text"
                        maxLength={2}
                        size="small"
                        value={origin}
                        onChange={(e) => handleChange(e, "origin")}
                        style={{ width: windowWidth <= 700 ? '100%' : '400px', display: 'block', background: 'floralwhite', borderColor: originError ? "red" : "" }}
                        className={originError ? "error-placeholder" : ""}
                        onClick={handleDisableResults}
                    />
                </Form.Item>

                <Form.Item
                    label="Pickup"
                    labelCol={{ span: windowWidth <= 700 ? 24 : 4 }}
                    wrapperCol={{ span: windowWidth <= 700 ? 24 : 20 }}
                    validateStatus={collectionError ? "error" : ""}
                    help={collectionError ? "" : ""}
                >
                    <Input
                        placeholder={collectionError ? collectionErrorMsg : "Pickup (A1-H8)"}
                        type="text"
                        maxLength={2}
                        size="small"
                        value={collection}
                        onChange={(e) => handleChange(e, "collection")}
                        style={{ width: windowWidth <= 700 ? '100%' : '400px', display: 'block', background: 'floralwhite', borderColor: originError ? "red" : "" }}
                        className={collectionError ? "error-placeholder" : ""}
                        onClick={handleDisableResults}
                    />
                </Form.Item>

                <Form.Item
                    label="Destination"
                    labelCol={{ span: windowWidth <= 700 ? 24 : 4 }}
                    wrapperCol={{ span: windowWidth <= 700 ? 24 : 20 }}
                    validateStatus={destinationError ? "error" : ""}
                    help={destinationError ? "" : ""}
                >
                    <Input
                        placeholder={destinationError ? destinationErrorMsg : "Destination (A1-H8)"}
                        type="text"
                        maxLength={2}
                        size="small"
                        value={destination}
                        onChange={(e) => handleChange(e, "destination")}
                        style={{ width: windowWidth <= 700 ? '100%' : '400px', display: 'block', background: 'floralwhite', borderColor: originError ? "red" : "" }}
                        className={destinationError ? "error-placeholder" : ""}
                        onClick={handleDisableResults}
                    />
                </Form.Item>
                <div>
                <Button
                    onClick={handleCalculateClick}
                    type="primary"
                    style={{ width: '180px', marginBottom: '10px'}}
                >
                    Calculate fastest route!
                </Button>

                {showResults && (
                    <>
                    <Card title="Route Results" style={{width: '100%', marginBottom: '10px', maxWidth: '400px', background: 'floralwhite'}}>
                        <Text>The set delivery will have the route: <strong>{path.join('-')}</strong></Text>
                        <br/>
                        <Text>, and will take <strong>{totalTime.toFixed(0)} seconds</strong> to be delivered as fast as
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
                </div>
            </Form>
        </div>
    );
}

export default ChessboardDroneRoute;
