/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */

export interface WorkParams {
  date: Date;
  starting_time?: Date | null;
  ending_time?: Date | null;
  break_time?: number | null;
  working_hours: number;
  pay_amount: number;
  memo?: string;
  user_id?: string;
  company_id?: string;
}
