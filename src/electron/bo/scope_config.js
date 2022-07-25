function ScopeConfig (scope_id, label, config, condition, position = 0) {
  return {
    scope_id,
    label,
    config,
    condition,
    position,
  }
}
exports.ScopeConfig = ScopeConfig;