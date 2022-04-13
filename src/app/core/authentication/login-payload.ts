export interface LoginPayload {
    access: string;
    refresh: string;
    user: {
        id: string;
        email: string;
    };
}
