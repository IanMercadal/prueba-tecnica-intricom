export interface FieldConfig<T> {
    key: keyof T;
    label: string;
    type?: 'text' | 'number';
}

export function EntityTable<T extends { id: number }>({
    items, fields, onEdit,
}: { items: T[]; fields: FieldConfig<T>[]; onEdit: (item: T) => void }) {
    return (
        <table>
            <thead>
                <tr>
                    {fields.map((f) => <th key={String(f.key)}>{f.label}</th>)}
                    <th>Acciones (No disponible)</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        {fields.map((f) => <td key={String(f.key)}>{String(item[f.key])}</td>)}
                        <td>
                            <button onClick={() => onEdit(item)}>Editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}