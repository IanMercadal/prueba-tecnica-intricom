import { useState } from 'react';
import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPatch, apiPost } from '../api';

interface Client {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export function ClientsPage() {
    const { items, refresh } = useEntity<Client>('/clients');
    const [editingItem, setEditingItem] = useState<Client | null>(null);

    const fields: FieldConfig<Client>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'phone', label: 'Teléfono' },
    ];

    const formFields: FieldConfig<Client>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'phone', label: 'Teléfono' },
    ];

    const handleCreate = async (data: Partial<Client>) => {
        await apiPost('/clients', data);
        refresh();
    };

    const handleUpdate = async (data: Partial<Client>) => {
        if (!editingItem) return;
        await apiPatch(`/clients/${editingItem.id}`, data);
        setEditingItem(null);
        refresh();
    };

    return (
        <div className="page">
            <h2>Clients</h2>
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
