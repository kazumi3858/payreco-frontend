/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import type { Company } from "./company";

/**
 * Work model
 */
export interface Work {
  readonly id?: string;
  date: Date;
  starting_time?: Date;
  ending_time?: Date;
  break_time?: number;
  working_hours: number;
  pay_amount: number;
  memo?: string;
  user_id: string;
  company_id?: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
  company?: Company;
}
