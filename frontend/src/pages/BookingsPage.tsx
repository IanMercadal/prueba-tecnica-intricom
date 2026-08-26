import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import type { FieldConfig } from '../components/EntityTable';

interface HotelBooking {
    id: number;
    hotelId: number;
    clientId: number;
    name: string;
    address: string;
    createdDate: string;
}

export function BookingsPage() {
    const { items } = useEntity<HotelBooking>('/bookings');

    const fields: FieldConfig<HotelBooking>[] = [
        { key: 'hotelId', label: 'Hotel' },
        { key: 'clientId', label: 'Cliente' },
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    return (
        <div>
            <h2>Bookings</h2>
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}
