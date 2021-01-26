import React, { useState } from 'react';
import useGlobal from './useGlobal';

export default function Counter({ name }) {

    let [count, setCount] = useGlobal(0, name);

    return <div>
        Count is {count}
        <button onClick={e => setCount(count + 1)}>Increment</button>
    </div>;
}