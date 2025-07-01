export interface Product {
    name: string;
    description: string;
    category: string;
    price: number;
    discountedPrice?: number;
    sizes: string[];
    colors: string[];
    images: string[];
    image360?: string[];
    inStock: boolean;
}