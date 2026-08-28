import { useState } from 'react';
import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPatch, apiPost } from '../api';

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
    const [editingItem, setEditingItem] = useState<HotelBooking | null>(null);

    const fields: FieldConfig<HotelBooking>[] = [
        { key: 'hotelId', label: 'Hotel' },
        { key: 'clientId', label: 'Cliente' },
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    const formFields: FieldConfig<HotelBooking>[] = [
        { key: 'hotelId', label: 'Hotel (id)', type: 'number' },
        { key: 'clientId', label: 'Cliente (id)', type: 'number' },
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
    ];

    const handleCreate = async (data: Partial<HotelBooking>) => {
        await apiPost('/bookings', data);
        refresh();
    };

    const handleUpdate = async (data: Partial<HotelBooking>) => {
        if (!editingItem) return;
        await apiPatch(`/bookings/${editingItem.id}`, data);
        setEditingItem(null);
        refresh();
    };

    return (
        <div className="page">
            <h2>Bookings</h2>
            <EntityForm
                key={editingItem?.id ?? 'create'}
                fields={formFields}
                initialValues={editingItem ?? undefined}
                onSubmit={editingItem ? handleUpdate : handleCreate}
                onCancel={editingItem ? () => setEditingItem(null) : undefined}
            />
            <EntityTable items={items} fields={fields} onEdit={setEditingItem} />
        </div>
    );
}
