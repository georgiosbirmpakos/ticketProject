//
// ATTEMPT 3
//
export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
    private readonly _data: T;

    private constructor(data: T) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    isOk(): this is Ok<T, E> {
        return true;
    }

    isErr<E>(): this is Err<T, E> {
        return false;
    }

    unwrap(): T {
        return this._data;
    }

    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched
     */
    map<U>(mapFunction: (data: T) => U): Result<U, E> {
        return new Ok(mapFunction(this._data));
    }

    /**
     * Maps a Result<T, E> to Result<T, I> by applying a function to a contained Err value, leaving an Ok value untouched.
     */
    mapErr<I>(mapFunction: (error: E) => I): Result<T, I> {
        return new Ok(this._data);
    }

    /**
     * Creates a new Result<T, E> with ok data
     */
    static new<T, E>(data: T): Result<T, E> {
        return new Ok(data);
    }

}

export class Err<T, E> {
    private readonly _error: E;

    private constructor(error: E) {
        this._error = error;
    }

    get error() {
        return this._error;
    }

    isOk<T>(): this is Ok<T,E> {
        return false;
    }

    isErr(): this is Err<T, E> {
        return true;
    }

    unwrap(): T {
        throw this._error;
    }

    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched
     */
    map<U>(mapFunction: (data: T) => U): Result<U, E> {
        return new Err(this._error);
    }

    /**
     * Maps a Result<T, E> to Result<T, I> by applying a function to a contained Err value, leaving an Ok value untouched.
     */
    mapErr<I>(mapFunction: (error: E) => I): Result<T, I> {
        return new Err(mapFunction(this._error));
    }

    /**
     * Creates a new Err
     */
    static new<T, E>(error: E): Err<T, E> {
        return new Err(error);
    }

}
