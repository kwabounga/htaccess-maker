function LockedRule (scope_id, origin, source, active = true) {
  return {
    scope_id,
    origin,
    source,
    active,
  }
}

exports.LockedRule = LockedRule;
