import { TypeUtils } from '../../../../modules/core/type-utils';

export class CreateMovieRequestDto {
    movieId: number = 0;
    name: string = '';
    description: string | null = null;
    image: File | null = null;
    directors: string = '';
    script: string = '';
    actors: string = '';
    appropriateness: string = '';
    duration: number = 0;

    static fromObj(obj: any): CreateMovieRequestDto | null  {
        if (!obj) {
            return null;
        }
        const createMovieRequestDto: CreateMovieRequestDto = new CreateMovieRequestDto();
        createMovieRequestDto.movieId = obj.movieId;
        createMovieRequestDto.name = obj.name;
        createMovieRequestDto.description = obj.description;
        createMovieRequestDto.image = obj.image;
        createMovieRequestDto.directors = obj.directors;
        createMovieRequestDto.script = obj.script;
        createMovieRequestDto.actors = obj.actors;
        createMovieRequestDto.appropriateness = obj.appropriateness;
        createMovieRequestDto.duration = obj.duration;
        return createMovieRequestDto;
    }

    static listFromObjList(objs: any[]): CreateMovieRequestDto[] | null  {
        if (!objs) {
            return null;
        }
        return objs.map(CreateMovieRequestDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}

export class CreateMovieResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): CreateMovieResponseDto | null  {
        if (!obj) {
            return null;
        }
        const createMovieResponseDto: CreateMovieResponseDto = new CreateMovieResponseDto();
        createMovieResponseDto.errors = obj.errors;
        return createMovieResponseDto;
    }
}
