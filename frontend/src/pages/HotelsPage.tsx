import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import { EntityForm } from '../components/EntityForm';
import type { FieldConfig } from '../components/EntityTable';
import { apiPost } from '../api';

interface Hotel {
    id: number;
    name: string;
    address: string;
    createdDate: string;
}

export function HotelsPage() {
    const { items, refresh } = useEntity<Hotel>('/hotels');

    const fields: FieldConfig<Hotel>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    const createFields: FieldConfig<Hotel>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
    ];

    const handleCreate = async (data: Partial<Hotel>) => {
        await apiPost('/hotels', data);
        refresh();
    };

    return (
        <div className="page">
            <h2>Hotels</h2>
            <EntityForm fields={createFields} onSubmit={handleCreate} />
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}
