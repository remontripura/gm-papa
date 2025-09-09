export interface IProduct {
    id: number;
    name: string;
    image: string;
    slug: string;
  }
  
  export interface ICategory {
    name: string;
    products: IProduct[];
  }
  
  export interface IProductRes {
    status: boolean;
    data: ICategory[];
    total: number;
    current_page: number;
    last_page: number;
  }
  