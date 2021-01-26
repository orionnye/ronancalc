import { useEffect, useState } from "react"

let observers = window.observers = new Map();

export default function useGlobal(defaultValue, name = "state") {
    
    let value = window[name] = window[name] ?? defaultValue;

    let [reactValue, setReactValue] = useState(value);

    // get observers of this named state
    let listeners = observers.get(name);
    //  create new set if first time
    if (listeners == null) {
        listeners = new Set();
        observers.set(name, listeners);
    }

    useEffect(() => {
        // add ourselves to listeners
        listeners.add(setReactValue);
        // return function called by react when this calling component is destroyed (or re-rendered)
        return () => {
            // remove ourselves from listeners
            listeners.delete(setReactValue);
        }
    })

    let setValue = (newValue) => {
        window[name] = newValue;
        for (let listener of listeners) {
            listener(newValue);
        }
    }

    return [value, setValue];
}