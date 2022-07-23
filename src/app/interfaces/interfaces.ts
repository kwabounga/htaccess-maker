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
export interface RedirectType {
    id?: number;
    label: string;
    value: string;
}

export interface Rule {
  id?: number;
  scope_id: number;
  redirect_type_id: number;
  origin: string;
  target: string;
  active: boolean;
}
