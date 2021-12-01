import { FileStreamService } from './filestream.service';

describe('Filestream unit tests', () => {
    test('should construct', () => {
        const fs = new FileStreamService();
        expect(fs).not.toBeNull();
    });
});
