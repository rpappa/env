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
