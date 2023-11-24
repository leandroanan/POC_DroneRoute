import { validateOrigin, validateCollection, validateDestination } from "../utils/validationStrategies";

describe('Validation Functions', () => {
    describe('validateOrigin', () => {
        it('returns an error when origin is empty', () => {
            expect(validateOrigin('')).toEqual({ error: true, message: "Origin is mandatory" });
        });

        it('returns an error when origin is less than 2 characters', () => {
            expect(validateOrigin('A')).toEqual({ error: true, message: "Type two characters between (A1-H8)" });
        });

        it('returns no error for valid origin', () => {
            expect(validateOrigin('A1')).toEqual({ error: false, message: "" });
        });
    });

    // Repita a estrutura semelhante para validateCollection e validateDestination
    describe('validateCollection', () => {
        it('returns an error when collection is empty', () => {
            expect(validateCollection('')).toEqual({ error: true, message: "Pickup is mandatory" });
        });

        it('returns an error when origin is less than 2 characters', () => {
            expect(validateCollection('A')).toEqual({ error: true, message: "Type two characters between (A1-H8)" });
        });

        it('returns no error for valid origin', () => {
            expect(validateCollection('A1')).toEqual({ error: false, message: "" });
        });
    });

    describe('validateDestination', () => {
        it('returns an error when destination is empty', () => {
            expect(validateDestination('')).toEqual({ error: true, message: "Destination is mandatory" });
        });

        it('returns an error when origin is less than 2 characters', () => {
            expect(validateDestination('A')).toEqual({ error: true, message: "Type two characters between (A1-H8)" });
        });

        it('returns no error for valid origin', () => {
            expect(validateDestination('A1')).toEqual({ error: false, message: "" });
        });
    });
});
