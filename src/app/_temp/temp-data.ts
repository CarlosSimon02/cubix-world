import { faker } from "@faker-js/faker";
import {
  IAddress,
  ICategory,
  ICourier,
  IFile,
  IOrder,
  IProduct,
  IStore,
  IUser,
} from "./temp-interfaces";

// Helper functions
const generateFile = (): IFile => ({
  name: faker.system.fileName(),
  percent: faker.number.int({ min: 0, max: 100 }),
  size: faker.number.int({ min: 1000, max: 1000000 }),
  status: faker.helpers.arrayElement([
    "error",
    "success",
    "done",
    "uploading",
    "removed",
  ]),
  type: faker.system.mimeType(),
  uid: faker.string.uuid(),
  url: faker.image.url(),
});

const generateAddress = (): IAddress => ({
  text: faker.location.streetAddress(),
  coordinate: [faker.location.longitude(), faker.location.latitude()],
});

// Generate Categories first (15 items)
const categories: ICategory[] = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  title: faker.commerce.department(),
  isActive: faker.datatype.boolean(),
}));

// Generate Products (1000 items)
const products: IProduct[] = Array.from({ length: 1000 }, () => {
  const category = faker.helpers.arrayElement(categories);

  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    isActive: faker.datatype.boolean(),
    description: faker.commerce.productDescription(),
    images: Array.from({ length: 3 }, () => ({
      ...generateFile(),
      thumbnailUrl: faker.image.urlLoremFlickr(),
    })),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    price: parseFloat(faker.commerce.price()),
    category: {
      id: category.id,
      title: category.title,
    },
    stock: faker.number.int({ min: 0, max: 1000 }),
  };
});

// Generate Users (1000 items)
const users: IUser[] = Array.from({ length: 1000 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    gender: faker.person.sex(),
    gsm: faker.phone.number(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    isActive: faker.datatype.boolean(),
    avatar: Array.from({ length: 3 }, generateFile),
    addresses: Array.from({ length: 2 }, generateAddress),
  };
});

// Generate Couriers (1000 items)
const couriers: ICourier[] = Array.from({ length: 1000 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
  gender: faker.person.sex(),
  gsm: faker.phone.number(),
  createdAt: faker.date.past({ years: 2 }).toISOString(),
  accountNumber: faker.finance.accountNumber(),
  licensePlate: faker.vehicle.vrm(),
  address: faker.location.streetAddress(),
  avatar: Array.from({ length: 3 }, generateFile),
  store: {
    id: faker.string.uuid(),
    title: faker.company.name(),
    isActive: faker.datatype.boolean(),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    gsm: faker.phone.number(),
    email: faker.internet.email(),
    address: generateAddress(),
    products: [],
  },
  status: {
    id: faker.string.uuid(),
    text: faker.helpers.arrayElement(["Available", "Offline", "On delivery"]),
  },
  vehicle: {
    model: faker.vehicle.model(),
    vehicleType: faker.vehicle.type(),
    engineSize: faker.number.float({ min: 1.0, max: 5.0 }),
    color: faker.vehicle.color(),
    year: faker.date.past({ years: 10 }).getFullYear(),
    id: faker.string.uuid(),
  },
}));

// Generate Orders (1000 items)
const orders: IOrder[] = Array.from({ length: 1000 }, () => {
  const orderProducts = faker.helpers.arrayElements(products, 3);

  return {
    id: faker.string.uuid(),
    user: faker.helpers.arrayElement(users),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    products: orderProducts,
    status: {
      id: faker.string.uuid(),
      text: faker.helpers.arrayElement([
        "Pending",
        "Ready",
        "On The Way",
        "Delivered",
        "Cancelled",
      ]),
    },
    adress: generateAddress(),
    store: {
      id: faker.string.uuid(),
      title: faker.company.name(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      gsm: faker.phone.number(),
      email: faker.internet.email(),
      address: generateAddress(),
      products: faker.helpers.arrayElements(products, 10),
    },
    courier: faker.helpers.arrayElement(couriers),
    events: Array.from({ length: 3 }, () => ({
      date: faker.date.recent({ days: 7 }).toISOString(),
      status: faker.helpers.arrayElement([
        "Processing",
        "Shipped",
        "Out for Delivery",
      ]),
    })),
    orderNumber: faker.number.int({ min: 1000, max: 9999 }),
    amount: orderProducts.reduce((sum, product) => sum + product.price, 0),
  };
});

const stores: IStore[] = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  title: faker.company.name(),
  isActive: faker.datatype.boolean(),
  createdAt: faker.date.past({ years: 2 }).toISOString(),
  gsm: faker.phone.number(),
  email: faker.internet.email(),
  address: generateAddress(),
  products: faker.helpers.arrayElements(products, 10),
}));

// Export all data
export const mockData = {
  categories,
  products,
  users,
  couriers,
  orders,
  stores,
};
