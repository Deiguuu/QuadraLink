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
    base: 0,
    hombro: 0,
    codo: 0,
    pinza: 0,

    setBase: (v) => set({ base: v }),
    setHombro: (v) => set({ hombro: v }),
    setCodo: (v) => set({ codo: v }),
    setPinza: (v) => set({ pinza: v }),


}));