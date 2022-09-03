interface QPEY {
  JWT_KEY?: string;
  MONGO_URI?: string;
  REDIS_URI?: string;
  API_KEY?: string;
  COOKIE_SECRET?: string;
  SERVER_PORT?: number;
}

interface MOMO {
  COLLECTIONS: {
    PRIMARY_KEY?: string;
    SECONDARY_KEY?: string;
  };
  REMITANCES: {
    PRIMARY_KEY?: string;
    SECONDARY_KEY?: string;
  };

  COLLECTION_WIDGET: {
    PRIMARY_KEY?: string;
    SECONDARY_KEY?: string;
  };
}

let QPEY_KEYS: QPEY, MOMO_KEYS: MOMO;

if (process.env.NODE_ENV !== "production") {
  QPEY_KEYS = {
    JWT_KEY: "asdfasd",
    MONGO_URI:
      "mongodb+srv://ian:E0H441pFrJaXheca@cluster0.jirp9cp.mongodb.net/?retryWrites=true&w=majority",
    REDIS_URI: "asdfasd",
    API_KEY: "asdfasd",
    COOKIE_SECRET: "asdfasd",
    SERVER_PORT: 4000,
  };

  MOMO_KEYS = {
    COLLECTION_WIDGET: {
      PRIMARY_KEY: "2f62493d18ed400c9c750aba7781c465",
      SECONDARY_KEY: "069f9e639c5840029bb3990b127e1816",
    },
    REMITANCES: {
      PRIMARY_KEY: "42e6b2eb4a384c5b9525623d86cac79d",
      SECONDARY_KEY: "2cdde1fa25d246ac857aa5628057f541",
    },
    COLLECTIONS: {
      PRIMARY_KEY: "62589072bde24d4ab92ccf414e961233",
      SECONDARY_KEY: "ba31a426393a481a86a60e7b325775f0",
    },
  };
} else {
  QPEY_KEYS = {
    JWT_KEY: process.env.JWT_KEY,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_URI: process.env.REDIS_URI,
    API_KEY: process.env.API_KEY,
    SERVER_PORT: process.env.SERVER_PORT as unknown as number,
  };
  MOMO_KEYS = {
    COLLECTION_WIDGET: {
      PRIMARY_KEY: process.env.COLLECTION_WIDGET_PRIMARY_KEY,
      SECONDARY_KEY: process.env.COLLECTION_WIDGET_SECONDARY_KEY,
    },
    REMITANCES: {
      PRIMARY_KEY: process.env.REMITANCES_PRIMARY_KEY,
      SECONDARY_KEY: process.env.REMITANCES_SECONDARY_KEY,
    },
    COLLECTIONS: {
      PRIMARY_KEY: process.env.COLLECTIONS_PRIMARY_KEY,
      SECONDARY_KEY: process.env.COLLECTIONS_SECONDARY_KEY,
    },
  };
}

export { QPEY_KEYS, MOMO_KEYS };
