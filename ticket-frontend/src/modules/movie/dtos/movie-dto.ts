import { TypeUtils } from '../../core/type-utils';

export class MovieDto {
    movieId: number | null = null;
    name: string = '';
    description: string = '';
    image: string = '';
    imageName: string = '';
    imageMimePrefix: string = '';
    directors: string = '';
    script: string = '';
    actors: string = '';
    appropriateness: string = '';
    duration: number = 0;
    trailerSrcUrl: string = '';
    year: number = 0;

    static fromObj(obj: any): MovieDto | null {
        if (!obj) {
            return null;
        }
        const movieModel: MovieDto = new MovieDto();
        movieModel.movieId = obj.movieId;
        movieModel.name = obj.name;
        movieModel.description = obj.description;
        movieModel.image = obj.image;
        movieModel.imageName = obj.imageName;
        movieModel.imageMimePrefix = obj.imageMimePrefix;
        movieModel.directors = obj.directors;
        movieModel.script = obj.script;
        movieModel.actors = obj.actors;
        movieModel.appropriateness = obj.appropriateness;
        movieModel.duration = obj.duration;
        movieModel.trailerSrcUrl = obj.trailerSrcUrl;
        movieModel.year = obj.year;
        return movieModel;
    }

    static listFromObjList(objs: any[]): MovieDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(MovieDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}