import { RequiredVariableError, env, envRequired, envRequiredNonEmpty, envStr } from '../src/index.js';

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

    it('does not escape substitutions', () => {
        process.env[String.raw`TEST\ENV`] = 'test';

        expect(env`TEST\ENV`).toBe('test');
        expect(env`TESTENV`).toBe(undefined);
        expect(env`TEST\\ENV`).toBe(undefined);
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

describe('envRequired', () => {
    it('should return the value of an environment variable', () => {
        process.env.TEST_ENV_REQUIRED_VAR = 'test';
        expect(envRequired`TEST_ENV_REQUIRED_VAR`).toBe('test');
    });

    it('should throw an error if the environment variable is not defined', () => {
        expect(() => envRequired`TEST_ENV_REQUIRED_VAR_2`).toThrow(RequiredVariableError);
        expect(() => envRequired`TEST_ENV_REQUIRED_VAR_2`).toThrow(
            'Environment variable "TEST_ENV_REQUIRED_VAR_2" is required but not set.'
        );
    });

    it('can handle substitutions', () => {
        const substitutionStr = 'A';
        const substitutionNumber = 1;

        process.env.TEST_ENV_REQUIRED_VAR_A_1 = 'test';

        expect(envRequired`TEST_ENV_REQUIRED_VAR_${substitutionStr}_${substitutionNumber}`).toBe('test');
    });

    it('can handle substitutions in the error message', () => {
        const substitutionStr = 'B';
        const substitutionNumber = 2;

        expect(() => envRequired`TEST_ENV_REQUIRED_VAR_${substitutionStr}_${substitutionNumber}`).toThrow(
            RequiredVariableError
        );
        expect(() => envRequired`TEST_ENV_REQUIRED_VAR_${substitutionStr}_${substitutionNumber}`).toThrow(
            'Environment variable "TEST_ENV_REQUIRED_VAR_B_2" is required but not set.'
        );
    });
});

describe('envRequiredNonEmpty', () => {
    it('should return the value of an environment variable', () => {
        process.env.TEST_ENV_REQUIRED_NON_EMPTY_VAR = 'test';
        expect(envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR`).toBe('test');
    });

    it('should throw an error if the environment variable is not defined', () => {
        expect(() => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_2`).toThrow(RequiredVariableError);
        expect(() => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_2`).toThrow(
            'Environment variable "TEST_ENV_REQUIRED_NON_EMPTY_VAR_2" is required but not set.'
        );
    });

    it('should throw an error if the environment variable is an empty string', () => {
        process.env.TEST_ENV_REQUIRED_NON_EMPTY_VAR_3 = '';
        expect(() => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_3`).toThrow(RequiredVariableError);
        expect(() => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_3`).toThrow(
            'Environment variable "TEST_ENV_REQUIRED_NON_EMPTY_VAR_3" is required but not set.'
        );
    });

    it('can handle substitutions', () => {
        const substitutionStr = 'A';
        const substitutionNumber = 1;

        process.env.TEST_ENV_REQUIRED_NON_EMPTY_VAR_A_1 = 'test';

        expect(envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_${substitutionStr}_${substitutionNumber}`).toBe(
            'test'
        );
    });

    it('can handle substitutions in the error message', () => {
        const substitutionStr = 'B';
        const substitutionNumber = 2;

        expect(
            () => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_${substitutionStr}_${substitutionNumber}`
        ).toThrow(RequiredVariableError);
        expect(
            () => envRequiredNonEmpty`TEST_ENV_REQUIRED_NON_EMPTY_VAR_${substitutionStr}_${substitutionNumber}`
        ).toThrow('Environment variable "TEST_ENV_REQUIRED_NON_EMPTY_VAR_B_2" is required but not set.');
    });
});
