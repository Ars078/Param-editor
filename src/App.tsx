import React, { useState } from 'react';
import ParamEditor from './ParamEditor';
import type { Param, Model } from './ParamEditor';

const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина',     type: 'string' },
];

const initialModel: Model = {
    paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 'макси' },
    ],
};

function App() {
    const [model, setModel] = useState<Model>(initialModel);

    const handleSave = () => {
        console.log('Сохранить на сервер:', model);
    };

    return (
        <div style={{ padding: 20 }}>
            <ParamEditor params={params} model={model} onChange={setModel} />
            <button onClick={handleSave} style={{ marginTop: 16 }}>
                Сохранить
            </button>
        </div>
    );
}

export default App;
