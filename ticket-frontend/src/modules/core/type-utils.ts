import { Err, Ok, Result } from './result';

export class TypeUtils {

    static isString(value: unknown): value is string {
        if (value === null || value === undefined) {
            return false;
        }
        return typeof value === 'string';
    }

    static isStringNullable(value: unknown): value is string | null | undefined {
        if (value === null || value === undefined) {
            return true;
        }
        return typeof value === 'string';
    }

    static unknownToString(value: unknown): Result<string, Error> {
        if (this.isString(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt string'))
        }
    }

    static unknownToStringNullable(value: unknown): Result<string | null, Error> {
        if (this.isStringNullable(value)) {
            if (value === undefined) {
                return Ok.new(null);
            }
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt string'))
        }
    }

    static isNumber(value: unknown): value is number {
        if (value === null || value === undefined) {
            return false;
        }
        return typeof value === 'number';
    }

    static isNumberNullable(value: unknown): value is number | null | undefined {
        if (value === null || value === undefined) {
            return true;
        }
        return typeof value === 'number';
    }

    static unknownToNumber(value: unknown): Result<number, Error> {
        if (this.isNumber(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt number'))
        }
    }

    static unknownToNumberNullable(value: unknown): Result<number | null, Error> {
        if (this.isNumberNullable(value)) {
            if (value === undefined) {
                return Ok.new(null);
            }
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt number'))
        }
    }

    static isBoolean(value: unknown): value is boolean {
        if (value === null || value === undefined) {
            return false;
        }
        return typeof value === 'boolean';
    }

    static isBooleanNullable(value: unknown): value is boolean | null | undefined {
        if (value === null || value === undefined) {
            return true;
        }
        return typeof value === 'boolean';
    }

    static unknownToBoolean(value: unknown): Result<boolean, Error> {
        if (this.isBoolean(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt boolean'))
        }
    }

    static unknownToBooleanNullable(value: unknown): Result<boolean | null, Error> {
        if (this.isBooleanNullable(value)) {
            if (value === undefined) {
                return Ok.new(null);
            }
            return Ok.new(value);
        } else {
            return Err.new(new Error('value type isnt boolean'))
        }
    }

    static isRecord(value: unknown): value is Record<string | number | symbol, unknown> {
        if (value === null || value === undefined) {
            return false;
        }
        if (typeof value !== 'object') {
            return false;
        }
        if (Array.isArray(value)) {
            return false;
        }
        return true;
    }

    static isRecordNullable(value: unknown): value is Record<string | number | symbol, unknown> | null | undefined {
        if (value === null || value === undefined) {
            return true;
        }
        if (typeof value !== 'object') {
            return false;
        }
        if (Array.isArray(value)) {
            return false;
        }
        return true;
    }

    static unknownToRecord(value: unknown): Result<Record<string | number | symbol, unknown>, Error> {
        if (this.isRecord(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error('value isnt record'))
        }
    }

    static unknownToRecordNullable(value: unknown): Result<Record<string | number | symbol, unknown> | null, Error> {
        console.log('value', value)
        if (this.isRecordNullable(value)) {
            if (value === undefined) {
                return Ok.new(null);
            }
            return Ok.new(value);
        } else {
            return Err.new(new Error('value isnt record'))
        }
    }

    static isArray(value: unknown): value is unknown[] {
        if (value === null || value === undefined) {
            return false;
        }
        if (typeof value !== 'object') {
            return false;
        }
        if (!Array.isArray(value)) {
            return false;
        }
        return true;
    }

    static isArrayNullable(value: unknown): value is unknown[] | null | undefined {
        if (value === null || value === undefined) {
            return true;
        }
        if (typeof value !== 'object') {
            return false;
        }
        if (!Array.isArray(value)) {
            return false;
        }
        return true;
    }

    static unknownToArray(value: unknown): Result<unknown[], Error> {
        if (this.isArray(value)) {
            return Ok.new(value);
        } else {
            return Err.new(new Error('value isnt array'))
        }
    }

    static unknownToArrayNullable(value: unknown): Result<unknown[] | null, Error> {
        if (this.isArrayNullable(value)) {
            if (value === undefined) {
                return Ok.new(null);
            }
            return Ok.new(value);
        } else {
            return Err.new(new Error('value isnt array'))
        }
    }

    static isNonNullable<T>(value: T | null | undefined): value is NonNullable<T> {
        return value !== null && value !== undefined;
    }

}