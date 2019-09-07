"use strict";

/**
 * This is global file and will be included by /webpack/demos/{demo}/script.js
 */

// Keentheme"s plugins
window.KTUtil = require("../../src/assets/js/theme/core/util");
window.KTApp = require("../../src/assets/js/theme/core/app");
window.KTAvatar = require("../../src/assets/js/theme/core/base/avatar");
window.KTDialog = require("../../src/assets/js/theme/core/base/dialog");
window.KTHeader = require("../../src/assets/js/theme/core/base/header");
window.KTMenu = require("../../src/assets/js/theme/core/base/menu");
window.KTOffcanvas = require("../../src/assets/js/theme/core/base/offcanvas");
window.KTPortlet = require("../../src/assets/js/theme/core/base/portlet");
window.KTScrolltop = require("../../src/assets/js/theme/core/base/scrolltop");
window.KTToggle = require("../../src/assets/js/theme/core/base/toggle");
window.KTWizard = require("../../src/assets/js/theme/core/base/wizard");
require("../../src/assets/js/theme/core/base/datatable/core.datatable");
require("../../src/assets/js/theme/core/base/datatable/datatable.checkbox");
require("../../src/assets/js/theme/core/base/datatable/datatable.rtl");

// Layout scripts
require("../../src/assets/js/theme/core/layout/demo-panel");
require("../../src/assets/js/theme/core/layout/offcanvas-panel");
require("../../src/assets/js/theme/core/layout/quick-panel");
require("../../src/assets/js/theme/core/layout/quick-search");
window.KTLib = require("../../src/assets/js/theme/core/lib");
