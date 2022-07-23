export interface ScopeConfig {
    id?: number;
    scope_id?: number;
    label: string;
    config: string;
    condition: string;
    position: number;
}


export interface Scope {
    id?: number;
    label: string;
}
