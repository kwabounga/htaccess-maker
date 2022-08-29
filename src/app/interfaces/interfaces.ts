/**
 * Inferfaces Declarations
 */

export interface ScopeConfig {
    id?: number;
    scope_id?: number;
    label: string;
    config: string;
    condition: string;
}

export interface Scope {
    id?: number;
    magento_scope_id: number;
    label: string;
    logo_svg?: string;
}
export interface RedirectType {
    id?: number;
    label: string;
    value: string;
    code: string;
}

export interface Rule {
  id?: number;
  scope_id: number;
  redirect_type_id: number;
  position?: number;
  origin: string;
  target: string;
  active?: boolean;
}
