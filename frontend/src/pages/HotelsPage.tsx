import { useEntity } from '../hooks/useEntity';
import { EntityTable } from '../components/EntityTable';
import type { FieldConfig } from '../components/EntityTable';

interface Hotel {
    id: number;
    name: string;
    address: string;
    createdDate: string;
}

export function HotelsPage() {
    const { items } = useEntity<Hotel>('/hotels');

    const fields: FieldConfig<Hotel>[] = [
        { key: 'name', label: 'Nombre' },
        { key: 'address', label: 'Dirección' },
        { key: 'createdDate', label: 'Fecha de creación' },
    ];

    return (
        <div>
            <h2>Hotels</h2>
            <EntityTable items={items} fields={fields} onEdit={() => { }} />
        </div>
    );
}
