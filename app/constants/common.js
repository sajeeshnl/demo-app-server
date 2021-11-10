/**
 * Application-wide constants
 */
"use strict";

module.exports = {
  VALID_REGIONS: ["jp"],
  VALID_LOCALE: ["ja"],
  VERSION: ["v1"],
  SUCCESS: "Success",
  SUCCESS_CODE: 200,
  API: {
    NEWS_EDIT: {
      TITLE: "News edit API",
      ID_INVALID: "Invalid news Id",
    },
    NEWS_LIST: {
      TITLE: "News list API",
    },
    NEWS_CREATE: {
      TITLE: "News create API",
    },
    BANNER_LIST: {
      TITLE: "Banner list API",
    },
    BANNER_ADMIN_LIST: {
      TITLE: "Banner Admin list API",
    },
    BANNER_EDIT: {
      TITLE: "Banner edit API",
      ID_INVALID: "Invalid Banner Id",
    },
    BANNER_DELETE: {
      TITLE: "Banner delete API",
      ID_INVALID: "Invalid Banner Id",
    },
    BANNER_CREATE: {
      TITLE: "Banner create API",
    },
    TAGS_EDIT: {
      TITLE: 'Tags edit API',
      ID_INVALID: 'Invalid tags Id'
    },
    TAGS_DELETE: {
      TITLE: 'Tags delete API',
      ID_INVALID: 'Invalid tags Id'
    },
    TAGS_LIST: {
      TITLE: 'Tags list API',
    },
    TAGS_CREATE: {
      TITLE: 'Tags create API',
    },

  },
  STATUS: {
    DISPLAYING: 1,
    DISPLAY_COMPLETED: 2,
    YET_TO_DISPLAY: 3,
  },
  LINK_TYPE: {
    NO_LINK: 0,
    URL: 1,
    PDP_URL: 2,
  },
  DISPLAY_TARGET: {
    DOT_ST_STORE: 1,
    BRAND: 2,
    STORE: 3
  },
  TOPIC: {
    API: {
      TOPIC_EDIT: {
        TITLE: 'Topic edit API',
        ID_INVALID: 'Invalid topic Id'
      },
      TOPIC_LIST: {
        TITLE: 'Topic list API',
      },
      ADMIN_TOPIC_LIST: {
        TITLE: 'Admin topic list API',
      },
      TOPIC_CREATE: {
        TITLE: 'Topic create API',
      },
      TOPIC_DELETE: {
        TITLE: 'Topic delete API',
      }
    },
  },
  PICKUP: {
    API: {
      PICKUP_EDIT: {
        TITLE: 'Pickup edit API',
        ID_INVALID: 'Invalid pickup Id'
      },
      PICKUP_LIST: {
        TITLE: 'Pickup list API',
      },
      ADMIN_PICKUP_LIST: {
        TITLE: 'Admin pickup list API',
      },
      PICKUP_CREATE: {
        TITLE: 'Pickup create API',
      },
      PICKUP_DELETE: {
        TITLE: 'Pickup delete API',
      }
    },
  }
};
