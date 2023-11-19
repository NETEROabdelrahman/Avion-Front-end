export type IUser = {
    username: string;
}
  
export type idata = {
    username?: string;
    password?: string;
    email?: string;
    city?: string;
    country?: string;
    phone?: number;
}

export type AppContextProps = {
    // searchPar?: string[];
    // setSearchPar?: React.Dispatch<React.SetStateAction<string>>;
    // filterPar: string;
    // setFilterPar: React.Dispatch<React.SetStateAction<string>>;
    //selectedOption: string;
    //setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    //sortedOption: string;
    //setSortedOption: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    //page: number;
    //setPage: React.Dispatch<React.SetStateAction<number>>;
}
  
export type options= {
    theValue: string;
    label: string;
}

export type product = {
    amount:number;
    category?: string;
    depth?: number;
    desc?: string;
    descPoints?: string[] | [];
    height: number;
    name: string;
    photos: string[];
    price: number;
    width: number;
    __v: number;
    _id: string;
}

export type ProductButtonProps = {
    data: product;
    pathname: any;
}

export type orders = {
    createdAt: string;
    order: product[];
    quantity: number[];
    status: string;
    totalPrice: number;
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
}