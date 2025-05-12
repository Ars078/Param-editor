import React, { useState, useEffect } from 'react';

export interface Param {
    id: number;
    name: string;
    type: 'string'; // позднее можно добавить 'number' и т.д.
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Model {
    paramValues: ParamValue[];
}

export interface Props {
    params: Param[];
    model: Model;
    onChange?: (m: Model) => void;
}

export const ParamEditor: React.FC<Props> = ({ params, model, onChange }) => {

    const [values, setValues] = useState<Record<number, string>>(
        () =>
            model.paramValues.reduce((acc, { paramId, value }) => {
                acc[paramId] = value;
                return acc;
            }, {} as Record<number, string>)
    );

    useEffect(() => {
        const updated: Model = { paramValues: params.map(p => ({ paramId: p.id, value: values[p.id] ?? '' })) };
        onChange?.(updated);
    }, [values, params, onChange]);

    const handleChange = (paramId: number, newValue: string) => {
        setValues(prev => ({ ...prev, [paramId]: newValue }));
    };

    const renderers: Record<string, (param: Param) => React.ReactNode> = {
        string: param => (
            <input
                type="text"
                value={values[param.id] ?? ''}
                onChange={e => handleChange(param.id, e.target.value)}
                style={{ padding: '4px 8px', width: 200 }}
            />
        ),
    };

    return (
        <div>
            {params.map(param => (
                <div key={param.id} style={{ margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 100, fontWeight: 'bold' }}>{param.name}</label>
                    {renderers[param.type]?.(param) ?? <span>Unsupported type</span>}
                </div>
            ))}
        </div>
    );
};

export default ParamEditor;