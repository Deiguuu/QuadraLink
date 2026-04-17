import { create } from "zustand";

interface RobotState {
    base: number;
    hombro: number;
    codo: number;
    pinza: number;

    setBase: (v: number) => void;
    setHombro: (v: number) => void;
    setCodo: (v: number) => void;
    setPinza: (v: number) => void;
}

export const useRobotStore = create<RobotState>((set) => ({
    base: 90,
    hombro: 45,
    codo: 45,
    pinza: 10,

    setBase: (v) => set({ base: clamp(v, 0, 180) }),
    setHombro: (v) => set({ hombro: clamp(v, 15, 90) }),
    setCodo: (v) => set({ codo: clamp(v, 0, 120) }),
    setPinza: (v) => set({ pinza: clamp(v, 0, 40) }),
}));

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}