/**
 * Gets the value of an environment variable.
 * @usage ```
 * env`VARIABLE_NAME`
 * ```
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {string | undefined} The value of the environment variable.
 */
export function env(strings, ...values) {
    const varName = String.raw(strings, ...values);
    return process.env[varName];
}

/**
 * Gets the value of an environment variable as a string, or an empty string if the variable is not defined.
 * @usage ```
 * envStr`VARIABLE_NAME`
 * ```
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {string} The value of the environment variable, or an empty string if the variable is not defined.
 */
export function envStr(strings, ...values) {
    return env(strings, ...values) ?? '';
}

export class RequiredVariableError extends Error {
    /**
     * A required environment variable was not set.
     * @param {string} varName
     */
    constructor(varName) {
        super(`Environment variable "${varName}" is required but not set.`);
    }
}

/**
 * Gets the value of an environment variable as a string, or throws an error if the variable is not defined.
 * @usage ```
 * envRequired`VARIABLE_NAME`
 * ```
 * @param {boolean} allowEmpty Whether to allow the empty string as a valid value.
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 * @throws {RequiredVariableError} If the environment variable is not set.
 * @returns {string} The value of the environment variable.
 */
function envRequiredBase(allowEmpty, strings, ...values) {
    const found = env(strings, ...values);

    if (found === undefined || (!allowEmpty && found === '')) {
        throw new RequiredVariableError(String.raw(strings, ...values));
    }

    return found;
}

/**
 * Gets the value of an environment variable as a string, or throws an error if the variable is not defined.
 *
 * The empty string is allowed as a valid value.
 *
 * @usage ```
 * envRequired`VARIABLE_NAME`
 * ```
 *
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 * @throws {RequiredVariableError} If the environment variable is not set.
 * @returns {string} The value of the environment variable
 */
export function envRequired(strings, ...values) {
    return envRequiredBase(true, strings, ...values);
}

/**
 * Gets the value of an environment variable as a string, or throws an error if the variable is not defined.
 *
 * The empty string is not allowed as a valid value.
 *
 * @usage ```
 * envRequired`VARIABLE_NAME`
 * ```
 *
 * @param {TemplateStringsArray} strings
 * @param  {...unknown} values
 * @throws {RequiredVariableError} If the environment variable is not set.
 * @returns {string} The value of the environment variable
 */
export function envRequiredNonEmpty(strings, ...values) {
    return envRequiredBase(false, strings, ...values);
}
