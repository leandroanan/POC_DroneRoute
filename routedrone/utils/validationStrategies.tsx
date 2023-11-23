export const validateOrigin = (origin) => {
    if (!origin) {
        return { error: true, message: "Origin is mandatory" };
    }
    if (origin.length < 2) {
        return { error: true, message: "Type two characters between (A1-H8)" };
    }
    return { error: false, message: "" };
};

export const validateCollection = (collection) => {
    if (!collection) {
        return { error: true, message: "Pickup is mandatory" };
    }
    if (collection.length < 2) {
        return { error: true, message: "Type two characters between (A1-H8)" };
    }
    return { error: false, message: "" };
};

export const validateDestination = (destination) => {
    if (!destination) {
        return { error: true, message: "Destination is mandatory" };
    }
    if (destination.length < 2) {
        return { error: true, message: "Type two characters between (A1-H8)" };
    }
    return { error: false, message: "" };
};