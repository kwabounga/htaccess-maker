function LockedRule (scope_id, origin, source, active = true) {
  return {
    scope_id,
    redirect_type_id,
    origin,
    source,
    active,
  }
}

exports.LockedRule = LockedRule;
