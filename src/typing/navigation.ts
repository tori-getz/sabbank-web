import type React from "react";

export interface IRoute {
    path: string
    component: React.ReactNode
}

export type Routes = Array<IRoute>;
