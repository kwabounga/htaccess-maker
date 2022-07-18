function Rule (scope_id, redirect_type_id, origin, target, active = true) {
  return {
    scope_id,
    redirect_type_id,
    origin,
    target,
    active,
  }
}

exports.Rule = Rule;