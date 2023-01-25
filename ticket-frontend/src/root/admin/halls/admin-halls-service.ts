import { GlobalState } from '../../../modules/core/global-state';
import { CreateHallRequestDto, CreateHallResponseDto } from './dtos/create-hall-dto';
import { DeleteHallResponseDto } from './dtos/delete-hall-dto';
import { FetchHallDetailsResponseDto } from './dtos/fetch-hall-details-dto';
import { FetchHallsListResponseDto } from './dtos/fetch-halls-list-dto';
import { FetchHallsOptionsResponseDto } from './dtos/fetch-halls-options-dto';
import { UpdateHallRequestDto, UpdateHallResponseDto } from './dtos/update-hall-dto';

export class AdminHallsService {

    static async fetchHallsList(): Promise<FetchHallsListResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchHallsListUrl = '/admin/halls/list'

        const response = await apiConsumer.get(fetchHallsListUrl);
        const fetchProvidersListResponseDto: FetchHallsListResponseDto | null = FetchHallsListResponseDto.fromObj(response.data)
        if (!fetchProvidersListResponseDto) {
            throw new Error('fetchProvidersListResponseDto was null');
        }
        return fetchProvidersListResponseDto;
    }

    static async fetchHallDetails(hallId: number): Promise<FetchHallDetailsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchHallDetailsUrl = '/admin/halls/details/' + hallId;

        const response = await apiConsumer.get(fetchHallDetailsUrl);
        const fetchHallDetailsResponseDto: FetchHallDetailsResponseDto | null = FetchHallDetailsResponseDto.fromObj(response.data)
        if (!fetchHallDetailsResponseDto) {
            throw new Error('fetchHallDetailsResponseDto was null');
        }
        return fetchHallDetailsResponseDto;
    }

    static async fetchHallOptions(): Promise<FetchHallsOptionsResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const fetchHallOptionsUrl = '/admin/halls/options';

        const response = await apiConsumer.get(fetchHallOptionsUrl);
        const fetchHallsOptionsResponseDto: FetchHallsOptionsResponseDto | null = FetchHallsOptionsResponseDto.fromObj(response.data)
        if (!fetchHallsOptionsResponseDto) {
            throw new Error('fetchHallsOptionsResponseDto was null');
        }
        return fetchHallsOptionsResponseDto;
    }

    static async createHall(createHallRequestDto: CreateHallRequestDto): Promise<CreateHallResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const createProviderUrl = '/admin/halls/new'

        const response = await apiConsumer.post(createProviderUrl, createHallRequestDto);
        const createHallResponseDto: CreateHallResponseDto | null = CreateHallResponseDto.fromObj(response.data)
        if (!createHallResponseDto) {
            throw new Error('createHallResponseDto was null');
        }
        return createHallResponseDto;
    }

    static async updateHall(updateHallRequestDto: UpdateHallRequestDto): Promise<UpdateHallResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const updateHallUrl = '/admin/halls/update'

        const response = await apiConsumer.put(updateHallUrl, updateHallRequestDto);
        const updateHallResponseDto: UpdateHallResponseDto | null = UpdateHallResponseDto.fromObj(response.data)
        if (!updateHallResponseDto) {
            throw new Error('updateHallResponseDto was null');
        }
        return updateHallResponseDto;
    }

    static async deleteHall(hallId: number): Promise<DeleteHallResponseDto> {
        const apiConsumer = GlobalState.instance.apiConsumer;
        const deleteHallUrl = '/admin/halls/id/' + hallId;

        const response = await apiConsumer.delete(deleteHallUrl);
        const deleteHallResponseDto: DeleteHallResponseDto | null = DeleteHallResponseDto.fromObj(response.data)
        if (!deleteHallResponseDto) {
            throw new Error('deleteHallResponseDto was null');
        }
        return deleteHallResponseDto;
    }

}