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
  /** Unique identifier for the given user. */
  readonly id: string;
  uid: string;
  name: string;
  target_amount?: number;
  readonly created_at?: Date;
  /** The date that the user was created. */
  readonly updated_at?: Date;
}
