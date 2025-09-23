import { z } from "zod";

export const playerAddressSchema = (
  loggedIn: boolean,
  wallet: boolean,
  phoneAllow: boolean
) =>
  z.object({
    name: loggedIn
      ? z.string().optional()
      : z.string().min(1, "Enter your name"),

    phone: loggedIn
      ? z.string().optional()
      : z.string().min(1, "Enter your phone number"),

    email: loggedIn
      ? z.string().optional()
      : z.string().email("Enter valid email"),

    number: wallet || phoneAllow
      ? z.string().optional()
      : z.string().regex(/^\d{11}$/, "Enter valid phone number"),

    transaction_id: wallet
      ? z.string().optional()
      : z.string().min(1, "Enter transaction id"),

    method_id: z.string(),
  });

//   {
//     "status": true,
//     "message": "Order created successfully",
//     "order": {
//         "quantity": 1,
//         "total": 20,
//         "product_id": "2",
//         "item_id": "1",
//         "customer_data": "remon",
//         "payment_method": "2",
//         "email": "remontripura045@gmail.com",
//         "phone": "01518398689",
//         "user_id": null,
//         "name": "Remon Tripura",
//         "transaction_id": "CIJ9JHPD7X",
//         "number": "01796943252",
//         "status": "processing",
//         "uid": "301A5C3AA0017F1",
//         "updated_at": "2025-09-23T04:11:01.000000Z",
//         "created_at": "2025-09-23T04:11:01.000000Z",
//         "id": 52
//     }
// }
