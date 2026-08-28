import { useState } from 'react';
import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPatch, apiPost } from '../api';

interface Hotel {
    id: number;
    name: string;
    address: string;
    createdDate: string;
}

export function HotelsPage() {
    const { items, refresh } = useEntity<Hotel>('/hotels');
    const [editingItem, setEditingItem] = useState<Hotel | null>(null);

    const fields: FieldConfig<Hotel>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    const formFields: FieldConfig<Hotel>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
    ];

    const handleCreate = async (data: Partial<Hotel>) => {
        await apiPost('/hotels', data);
        refresh();
    };

    const handleUpdate = async (data: Partial<Hotel>) => {
        if (!editingItem) return;
        await apiPatch(`/hotels/${editingItem.id}`, data);
        setEditingItem(null);
        refresh();
    };

    return (
        <div className="page">
            <h2>Hotels</h2>
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
