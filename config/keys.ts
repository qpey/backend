import * as prod from './prod';
import * as dev from './dev';

process.env.NODE_ENV === 'production'
	? (exports = { prod })
	: (exports = { dev });
