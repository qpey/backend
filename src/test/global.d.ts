declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}
