import { TypeUtils } from '../../../modules/core/type-utils';

export class MovieModel {
    movieId: number = 0;
    name: string = '';
    description: string | null = null;
    image: string = '';
    directors: string = '';
    script: string = '';
    actors: string = '';
    appropriateness: string = '';
    duration: number = 0;

    static fromObj(obj: any): MovieModel | null {
        if (!obj) {
            return null;
        }
        const movieModel: MovieModel = new MovieModel();
        movieModel.movieId = obj.movieId;
        movieModel.name = obj.name;
        movieModel.description = obj.description;
        movieModel.image = obj.image;
        movieModel.directors = obj.directors;
        movieModel.script = obj.script;
        movieModel.actors = obj.actors;
        movieModel.appropriateness = obj.appropriateness;
        movieModel.duration = obj.duration;
        return movieModel;
    }

    static listFromObjList(objs: any[]): MovieModel[] {
        if (!objs) {
            return [];
        }
        return objs.map(MovieModel.fromObj).filter(TypeUtils.isNonNullable);
    }
}