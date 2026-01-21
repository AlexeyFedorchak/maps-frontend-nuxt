import {useAuth} from "~/composables/useAuth";

export const useApi = () => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiUrl,
    });

    return {
        getProductOptions: async (slug: string) => {
            try {
                return api(`/product/options/${slug}`);
            } catch (error) {
                console.error('Get product API error:', error);
            }
        },
        login: async (email: string, password: string) => {
            try {
                const {data} = await api(`/user/login`, {
                    method: 'POST',
                    body: {email: email, password: password}
                });

                return data;
            } catch (error) {
                console.error('Login API error:', error);
            }

            return null;
        },
        forgotPassword: async (email: string) => {
            try {
                await api(`/user/forgot-password`, {
                    method: 'POST',
                    body: JSON.stringify({ email: email }),
                });
            } catch (error) {
                console.error('Login API error:', error);
            }
        },
        calculatePrices: async (products: Array<{
            slug: string,
            sizeId: number,
            extraIds?: number[],
            frameId?: number
        }>) => {
            try {
                return await api('/checkout/calculate', {
                    method: 'POST',
                    body: {products}
                });
            } catch (error) {
                console.error('Price calculation API error:', error);
                throw error;
            }
        },
        checkout: async (
            // params ...
        ) => {
            const {getToken} = useAuth();

            try {
                return await api('/checkout', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getToken()}`, // <- important for correct login
                    },
                    body: {products},
                });
            } catch (error) {
            }
        }
    }
}
