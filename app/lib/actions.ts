"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: "Please select a customer." }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll also log the error to the console for now
    console.error(error);
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // log the error to the console for now
    console.error(error);
    throw new Error("Database Error: Failed to Update Invoice.");
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  // Validate input
  if (!id || id.trim() === "") {
    throw new Error("Invalid invoice ID provided");
  }

  try {
    console.log(`Attempting to delete invoice with ID: ${id}`);

    // First check if the invoice exists
    const existingInvoice = await sql`
      SELECT id FROM invoices WHERE id = ${id}
    `;

    if (existingInvoice.length === 0) {
      throw new Error(`Invoice with ID ${id} not found`);
    }

    // Delete the invoice
    const result = await sql`DELETE FROM invoices WHERE id = ${id}`;

    console.log(`Successfully deleted invoice with ID: ${id}`);

    // Revalidate both invoices page and dashboard to update totals
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Database Error while deleting invoice:", error);

    if (error instanceof Error) {
      throw new Error(`Failed to Delete Invoice: ${error.message}`);
    } else {
      throw new Error("Failed to Delete Invoice: Unknown error occurred");
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
