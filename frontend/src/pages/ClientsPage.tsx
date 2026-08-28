import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPost } from '../api';

interface Client {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export function ClientsPage() {
    const { items, refresh } = useEntity<Client>('/clients');

    const fields: FieldConfig<Client>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'phone', label: 'Teléfono' },
    ];

    const createFields: FieldConfig<Client>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'phone', label: 'Teléfono' },
    ];

    const handleCreate = async (data: Partial<Client>) => {
        await apiPost('/clients', data);
        refresh();
    };

    return (
        <div className="page">
            <h2>Clients</h2>
            <EntityForm fields={createFields} onSubmit={handleCreate} />
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}
