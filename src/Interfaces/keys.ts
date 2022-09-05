export interface QPEY {
  JWT_KEY?: string;
  MONGO_URI?: string;
  REDIS_URI?: string;
  SECRET_KEY?: string;
  COOKIE_SECRET?: string;
  SERVER_PORT?: number;
  TWILIO_PHONE_NO?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
}

export interface MOMO {
  COLLECTIONS: {
    PRI_KEY?: string;
    SEC_KEY?: string;
  };
  REMITANCES: {
    PRI_KEY?: string;
    SEC_KEY?: string;
  };

  COLLECTION_WIDGET: {
    PRI_KEY?: string;
    SEC_KEY?: string;
  };
}
