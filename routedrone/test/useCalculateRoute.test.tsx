import {renderHook} from "@testing-library/react";
import useCalculateRoute from "../hook/useCalculateRoute";

// eslint-disable-next-line no-undef
describe('useCalculateRoute', () => {
    it('calculates the correct route and total time', () => {
        const origin = 'A1';
        const collection = 'B2';
        const destination = 'C3';
        const movementTimes = {
            'A1': { 'B2': 1 },
            'B2': { 'C3': 2 }
        };

        const { JSDOM } = require('jsdom');
        const { window } = new JSDOM("");

        global.window = window;
        global.document = window.document;

        const { result } = renderHook(() => useCalculateRoute(origin, collection, destination, movementTimes));

        expect(result.current.path).toEqual(['A1', 'B2', 'C3']);
        // eslint-disable-next-line no-undef
        expect(result.current.totalTime).toBe(180);
    });
});
