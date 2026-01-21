export const useAuth = () => {
    const {login, forgotPassword} = useApi();

    return {
        loginWithApi: async (email: string, password: string) => {
            const data = await login(email, password);

            if (!data) {
                return false;
            }

            localStorage.setItem('authToken', data.authToken);
            localStorage.setItem('authUser', JSON.stringify(data.user));

            return true;
        },
        forgotPasswordWithApi: async (email: string) => {
            await forgotPassword(email);
        },
        getToken: (): string => {
            return localStorage.getItem('authToken') ?? '';
        },
        getUser: (): object | null => {
            const userJson = localStorage.getItem('authUser');

            try {
                return userJson ? JSON.parse(userJson) : null;
            } catch {}

            return null;
        },
        logout: () => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
        }
    };
}
