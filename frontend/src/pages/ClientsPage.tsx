import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import type { FieldConfig } from '../components/EntityTable';

interface Client {
    id: number;
    name: string;
    address: string;
    phone: string;
}

export function ClientsPage() {
    const { items } = useEntity<Client>('/clients');

    const fields: FieldConfig<Client>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'phone', label: 'Teléfono' },
    ];

    return (
        <div>
            <h2>Clients</h2>
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}