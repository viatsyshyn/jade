/*!
 * Jade - debug
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var debugStack = []
  , restorePoints = {};

module.exports = {
  /**
   *
   * @param {Number|String} restorePoint
   */
  store: function (restorePoint) {
    if (restorePoints.hasOwnProperty(restorePoint))
        throw Error('Duplicate restore point ' + restorePoint);

    restorePoints[restorePoint] = debugStack.length;
  },

  /**
   *
   * @param {Number|String} restorePoint
   */
  restore: function (restorePoint) {
    if (!restorePoints.hasOwnProperty(restorePoint))
      throw Error('Unknown restore point ' + restorePoint);

    debugStack = debugStack.slice(0, restorePoints[restorePoint]);
  },

  /**
   *
   * @param {String|Object} filename
   * @param {Number} lineno
   * @param {Object} obj
   */
  unshift: function (filename, lineno, obj) {
    if (arguments.length == 1) {
      obj = filename;
      filename = null;
    }

    var info = {
      filename: filename || obj.filename,
      lineno: lineno || obj.lineno,
      obj: obj
    };

    debugStack.unshift(info);
  },

  /**
   *
   */
  shift: function () {
    return debugStack.shift();
  },

  peek: function () {
    return debugStack[0] || {};
  },

  stack: function () {
    return debugStack
      .map(function (info) {
        return info.filename + ':' + info.lineno + ' ' + JSON.stringify(info.obj);
      })
      .join('\n');
  }
};
