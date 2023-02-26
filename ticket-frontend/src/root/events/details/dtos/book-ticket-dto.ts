export class BookTicketRequestDto {
    ticketsIds: number[] = [];

    static fromObj(obj: any): BookTicketRequestDto | null {
        if (!obj) {
            return null;
        }
        const bookTicketRequestDto: BookTicketRequestDto = new BookTicketRequestDto();
        bookTicketRequestDto.ticketsIds = obj.ticketsIds;
        return bookTicketRequestDto;
    }
}

export class BookTicketResponseDto {
    errors: string[] = [];

    static fromObj(obj: any): BookTicketResponseDto | null {
        if (!obj) {
            return null;
        }
        const bookTicketResponseDto: BookTicketResponseDto = new BookTicketResponseDto();
        bookTicketResponseDto.errors = obj.errors;
        return bookTicketResponseDto;
    }
}