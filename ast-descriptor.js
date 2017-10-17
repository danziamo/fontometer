'use strict';

module.exports = {
    p: (body) => ({
        type: 'Program', body: body }),
    es: (expr) => ({
        type: 'ExpressionStatement', expression: expr }),
    ifs: (test, consequent, alternate) => ({
        type: 'IfStatement', test: test, consequent: consequent, alternate: alternate || null }),
    be: (operator, left, right) => ({
        type: 'BinaryExpression', operator: operator, left: left, right: right }),
    le: (operator, left, right) => ({
        type: 'LogicalExpression', operator: operator, left: left, right: right }),
    ae: (operator, left, right) => ({
        type: 'AssignmentExpression', operator: operator, left: left, right: right }),
    me: (object, property, computed) => ({
        type: 'MemberExpression', object: object, property: property, computed: computed || false }),
    ce: (callee, args) => ({
        type: 'CallExpression', callee: callee, arguments: args || [] }),
    vds: (declarations, kind) => ({
        type: 'VariableDeclaration', declarations: declarations || [], kind: kind || 'var' }),
    vdr: (id, init) => ({
        type: 'VariableDeclarator', id: id, init: init }),
    id: (name) => ({
        type: 'Identifier', name: name.toString() }),
    lit: (val) => ({
        type: 'Literal', value: val }),
    fs: (init, test, update, body) => ({
        type: 'ForStatement', init: init, test: test, update: update, body: body }),
    bs: (body) => ({
        type: 'BlockStatement', body: body }),
    oe: (properties) => ({
        type: 'ObjectExpression', properties: properties || [] }),
    pr: (key, value, computed) => ({
        type: 'Property', key: key, value: value, computed: computed || false,
        kind: 'init', method: false, shorthand: false }),
    fe: (params, body) => ({
        type: 'FunctionExpression', id: null, params: params,
        body: body, generator: false, expression: false, async: false }),
    rs: (argument) => ({
        type: 'ReturnStatement', argument: argument }),
    cs: (label) => ({
        type: 'ContinueStatement', label: label || null }),
    ue: (operator, argument, prefix) => ({
        type: 'UnaryExpression', operator: operator, argument: argument, prefix: prefix || true }),
    ts: (block, handler, finalizer) => ({
        type: 'TryStatement', block: block, handler: handler , finalizer: finalizer || null }),
    cc: (param, body) => ({
        type: 'CatchClause', param: param, body: body }),
    afe: (params, body) => ({
        type: 'ArrowFunctionExpression', params: params, body: body, id: null, generator: false, expression: true, asyns: false }),
    ls: (label, body) => ({
        type: 'LabeledStatement', label: label, body: body })
};
