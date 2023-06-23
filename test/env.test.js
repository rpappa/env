import { env, envStr } from '../src/index.js';

describe('env', () => {
    it('should return the value of an environment variable', () => {
        process.env.TEST_ENV_VAR = 'test';
        expect(env`TEST_ENV_VAR`).toBe('test');
    });

    it('should return undefined if the environment variable is not defined', () => {
        expect(env`TEST_ENV_VAR_2`).toBeUndefined();
    });

    it('can handle substitutions', () => {
        const substitutionStr = 'A';
        const substitutionNumber = 1;

        process.env.TEST_ENV_VAR_A_1 = 'test';

        expect(env`TEST_ENV_VAR_${substitutionStr}_${substitutionNumber}`).toBe('test');
    });
});

describe('envStr', () => {
    it('should return the value of an environment variable', () => {
        process.env.TEST_ENV_STR_VAR = 'test';
        expect(envStr`TEST_ENV_STR_VAR`).toBe('test');
    });

    it('should return an empty string if the environment variable is not defined', () => {
        expect(envStr`TEST_ENV_STR_VAR_2`).toBe('');
    });

    it('can handle substitutions', () => {
        const substitutionStr = 'A';
        const substitutionNumber = 1;

        process.env.TEST_ENV_STR_VAR_A_1 = 'test';

        expect(envStr`TEST_ENV_STR_VAR_${substitutionStr}_${substitutionNumber}`).toBe('test');
    });
});
