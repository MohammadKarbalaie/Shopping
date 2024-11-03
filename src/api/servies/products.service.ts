import { httpClient } from "../client";
import { urls } from "../urls";

export async function fetchProducts(limit: number, skip: number) {
    const response = await httpClient().get(`${urls.products.products}?limit=${limit}&skip=${skip}`);
    return {
        products: response.data.products,
        total: response.data.total,   
    };
}
