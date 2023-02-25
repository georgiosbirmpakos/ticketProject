import { GlobalState } from '../../../modules/core/global-state';
import { CreateProviderRequestDto, CreateProviderResponseDto } from './dtos/create-provider-dto';
import { DeleteProviderResponseDto } from './dtos/delete-provider-dto';
import { FetchProviderDetailsResponseDto } from './dtos/fetch-providers-details-dto';
import { FetchProvidersListResponseDto } from './dtos/fetch-providers-list-dto';
import { UpdateProviderRequestDto, UpdateProviderResponseDto } from './dtos/update-provider-dto';

export class AdminProvidersService {

    static async fetchProvidersList(): Promise<FetchProvidersListResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchProvidersListUrl = '/admin/providers/list'

        const response = await apiConsumer.get(fetchProvidersListUrl);
        const fetchProvidersListResponseDto: FetchProvidersListResponseDto | null = FetchProvidersListResponseDto.fromObj(response.data)
        if (!fetchProvidersListResponseDto) {
            throw new Error('fetchProvidersListResponseDto was null');
        }
        return fetchProvidersListResponseDto;
    }

    static async fetchProviderDetails(providerId: number): Promise<FetchProviderDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchProviderDetailsUrl = '/admin/providers/details/' + providerId;

        const response = await apiConsumer.get(fetchProviderDetailsUrl);
        const fetchProviderDetailsResponseDto: FetchProviderDetailsResponseDto | null = FetchProviderDetailsResponseDto.fromObj(response.data)
        if (!fetchProviderDetailsResponseDto) {
            throw new Error('fetchProviderDetailsResponseDto was null');
        }
        return fetchProviderDetailsResponseDto;
    }

    static async createProvider(createProviderRequestDto: CreateProviderRequestDto): Promise<CreateProviderResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const createProviderUrl = '/admin/providers/new'

        const response = await apiConsumer.post(createProviderUrl, createProviderRequestDto);
        const createProviderResponseDto: CreateProviderResponseDto | null = CreateProviderResponseDto.fromObj(response.data)
        if (!createProviderResponseDto) {
            throw new Error('createProviderResponseDto was null');
        }
        return createProviderResponseDto;
    }

    static async updateProvider(updateProviderRequestDto: UpdateProviderRequestDto): Promise<UpdateProviderResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const updateProviderUrl = '/admin/providers/update'

        const response = await apiConsumer.put(updateProviderUrl, updateProviderRequestDto);
        const updateProviderResponseDto: UpdateProviderResponseDto | null = UpdateProviderResponseDto.fromObj(response.data)
        if (!updateProviderResponseDto) {
            throw new Error('updateProviderResponseDto was null');
        }
        return updateProviderResponseDto;
    }

    static async deleteProvider(providerId: number): Promise<DeleteProviderResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteProviderUrl = '/admin/providers/id/' + providerId;

        const response = await apiConsumer.delete(deleteProviderUrl);
        const deleteProviderResponseDto: DeleteProviderResponseDto | null = DeleteProviderResponseDto.fromObj(response.data)
        if (!deleteProviderResponseDto) {
            throw new Error('deleteProviderResponseDto was null');
        }
        return deleteProviderResponseDto;
    }


    //     static async createMovie(createMovieRequestDto: CreateMovieRequestDto): Promise<CreateMovieResponseDto | null> {
    //         const apiConsumer = GlobalState.instance.apiConsumer;
    //         const fetchMoviesListUrl = '/admin/movies/new'
    //         console.log('createMovieRequestDto', createMovieRequestDto)


    //         const formData = new FormData();
    //         formData.append('name', createMovieRequestDto.name);
    //         formData.append('description', createMovieRequestDto.description ? createMovieRequestDto.description : '');
    //         if (createMovieRequestDto.image) {
    //             formData.append('image', createMovieRequestDto.image);
    //         }
    //         formData.append('directors', createMovieRequestDto.directors);
    //         formData.append('script', createMovieRequestDto.script);
    //         formData.append('actors', createMovieRequestDto.actors);
    //         formData.append('appropriateness', createMovieRequestDto.appropriateness);
    //         formData.append('duration', '' + createMovieRequestDto.duration);

    //         const response = await apiConsumer.post(fetchMoviesListUrl, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         return CreateMovieResponseDto.fromObj(response.data);
    //     }


}