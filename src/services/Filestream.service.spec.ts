import { FileStreamService } from './Filestream.service';

describe('Filestream unit tests', () => {
    test('should construct', () => {
        const fs = new FileStreamService();
        expect(fs).not.toBeNull();
    });
});
