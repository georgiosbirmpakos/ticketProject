import { TypeUtils } from '../core/type-utils';
import { HallListItemDto } from '../hall/hall-list-item-dto';

export class ProviderDto {
    providerId: number | null = null;
    name: string = '';
    address: string = '';
    phone: string = '';
    description: string = '';
    googleMapsSrc: string = '';
    halls: HallListItemDto[] = [];

    static fromObj(obj: any): ProviderDto | null {
        if (!obj) {
            return null;
        }
        const providerDto: ProviderDto = new ProviderDto();
        providerDto.providerId = obj.providerId;
        providerDto.name = obj.name;
        providerDto.address = obj.address;
        providerDto.phone = obj.phone;
        providerDto.description = obj.description;
        providerDto.googleMapsSrc = obj.googleMapsSrc;
        providerDto.halls = HallListItemDto.listFromObjList(obj.halls);
        return providerDto;
    }

    static listFromObjList(objs: any[]): ProviderDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(ProviderDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}