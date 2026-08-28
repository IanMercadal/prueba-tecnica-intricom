import { useState } from 'react';
import type { FormEvent } from 'react';
import type { FieldConfig } from './EntityTable';

export function EntityForm<T>({
    fields, onSubmit, initialValues, onCancel,
}: {
    fields: FieldConfig<T>[];
    onSubmit: (data: Partial<T>) => Promise<void>;
    initialValues?: Partial<T>;
    onCancel?: () => void;
}) {
    const isEditing = initialValues !== undefined;

    const [values, setValues] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        for (const f of fields) {
            const raw = initialValues?.[f.key];
            initial[String(f.key)] = raw === undefined ? '' : String(raw);
        }
        return initial;
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data: Record<string, unknown> = {};
        for (const f of fields) {
            const raw = values[String(f.key)] ?? '';
            data[String(f.key)] = f.type === 'number' ? Number(raw) : raw;
        }

        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(data as Partial<T>);
            if (!isEditing) {
                setValues({});
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((f) => (
                <div key={String(f.key)}>
                    <label>{f.label}</label>
                    <input
                        type={f.type === 'number' ? 'number' : 'text'}
                        value={values[String(f.key)] ?? ''}
                        onChange={(e) => setValues((prev) => ({ ...prev, [String(f.key)]: e.target.value }))}
                        required
                    />
                </div>
            ))}
            <button type="submit" disabled={submitting}>
                {submitting ? (isEditing ? 'Guardando...' : 'Creando...') : (isEditing ? 'Guardar' : 'Crear')}
            </button>
            {onCancel && (
                <button type="button" onClick={onCancel} disabled={submitting}>
                    Cancelar
                </button>
            )}
            {error && <p>{error}</p>}
        </form>
    );
}
