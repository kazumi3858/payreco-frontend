/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */

/**
 * User model
 */
export interface User {
  readonly id: string;
  readonly uid: string;
  readonly name: string;
  target_amount: number | null;
  readonly created_at: Date;
  readonly updated_at: Date;
}
