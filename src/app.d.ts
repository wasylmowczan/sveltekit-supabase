import { SupabaseClient, Session, User } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
			session: Session | null
			user: User | null
		}
		interface PageData {
			session: Session | null;
			theme: string | 'default';
			meta?: {
				title: string;
				description: string;
				keywords: string;
				ogimage: string;
			};
		}
		// interface Error {}
		// interface Platform {}
	}
}
