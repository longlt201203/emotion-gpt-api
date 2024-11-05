export interface GetAuthUriParams {
	client_id: string;
	redirect_uri: string;
	response_type: string;
	scope: string;
	access_type?: string;
	state?: string;
	include_granted_scopes?: boolean;
	enable_granular_consent?: boolean;
	login_hint?: string;
	prompt?: string;
}
