function SpecialRule (scope_id, label, regex, target, active = true) {
  return {
    scope_id: scope_id,
    label: label,
    regex: regex,
    target: target,
    active: active,
  }
}
exports.SpecialRule = SpecialRule;
