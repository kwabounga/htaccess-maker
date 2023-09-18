// import all business objects from all bo files
  const { FooterConfig } = require('./bo/footer_config');
  const { HeaderConfig } = require('./bo/header_config');
  const { RedirectType } = require('./bo/redirect_type');
  const { Rule } = require('./bo/rule');
  const { LockedRule } = require('./bo/locked_rule');
  const { ScopeConfig } = require('./bo/scope_config');
  const { Scope } = require('./bo/scope');
  const { SpecialRule } = require('./bo/special_rule');

/* Export */
exports.FooterConfig = FooterConfig;
exports.HeaderConfig = HeaderConfig;
exports.RedirectType = RedirectType;
exports.Rule = Rule;
exports.LockedRule = LockedRule;
exports.ScopeConfig = ScopeConfig;
exports.Scope = Scope;
exports.SpecialRule = SpecialRule;

