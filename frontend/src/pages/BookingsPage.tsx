import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPost } from '../api';

interface HotelBooking {
    id: number;
    hotelId: number;
    clientId: number;
    name: string;
    address: string;
    createdDate: string;
}

export function BookingsPage() {
    const { items, refresh } = useEntity<HotelBooking>('/bookings');

    const fields: FieldConfig<HotelBooking>[] = [
        { key: 'hotelId', label: 'Hotel' },
        { key: 'clientId', label: 'Cliente' },
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    const createFields: FieldConfig<HotelBooking>[] = [
        { key: 'hotelId', label: 'Hotel (id)', type: 'number' },
        { key: 'clientId', label: 'Cliente (id)', type: 'number' },
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
    ];

    const handleCreate = async (data: Partial<HotelBooking>) => {
        await apiPost('/bookings', data);
        refresh();
    };

    return (
        <div className="page">
            <h2>Bookings</h2>
            <EntityForm fields={createFields} onSubmit={handleCreate} />
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}
