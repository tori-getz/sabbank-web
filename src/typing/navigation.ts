import type React from "react";

export interface IRoute {
    path: string
    component: React.FC
}

export type Routes = Array<IRoute>;
