import { defineTool } from "eve/tools";
import { z } from "zod";
import { normalize, opportunities } from "../lib/data";

export default defineTool({
  description: "Look up a fictional consulting opportunity by customer name.",
  inputSchema: z.object({
    customer: z
      .string()
      .min(1)
      .describe("The customer name or opportunity ID to look up"),
  }),
  async execute({ customer }) {
    const normalizedCustomer = normalize(customer);
    const opportunity = opportunities.find(
      (item) =>
        normalize(item.customer) === normalizedCustomer ||
        normalize(item.id) === normalizedCustomer,
    );

    if (!opportunity) {
      return {
        found: false,
        customer,
        availableCustomers: opportunities.map((item) => item.customer),
      };
    }

    return { found: true, opportunity };
  },
});
