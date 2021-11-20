export interface Login {
	facultyMobile: string;
	facultyPassword: string;
	terms: boolean;
	languageID: string;
}
export interface ApiResponse {
	data: Array<[]>;
	status: string;
	message: string;
}
