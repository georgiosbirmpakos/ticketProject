import { TypeUtils } from '../core/type-utils';

export class ProviderListItemDto {
    providerId: number = 0;
    name: string = '';
    address: string = '';
    phone: string = '';
    description: string = '';
    googleMapsSrc: string = '';

    static fromObj(obj: any): ProviderListItemDto | null {
        if (!obj) {
            return null;
        }
        const providerDto: ProviderListItemDto = new ProviderListItemDto();
        providerDto.providerId = obj.providerId;
        providerDto.name = obj.name;
        providerDto.address = obj.address;
        providerDto.phone = obj.phone;
        providerDto.description = obj.description;
        providerDto.googleMapsSrc = obj.googleMapsSrc;
        return providerDto;
    }

    static listFromObjList(objs: any[]): ProviderListItemDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(ProviderListItemDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}