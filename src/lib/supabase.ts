// Mock Supabase client for development
// In production, this would be replaced with the actual Supabase client
// once the database schema is created

interface SupabaseClient {
  from: (table: string) => any;
  functions: {
    invoke: (name: string, options?: any) => Promise<{ data: any; error: any }>;
  };
}

// Mock implementation for development
const mockSupabase: SupabaseClient = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        limit: (count: number) => Promise.resolve({ data: [], error: null }),
        order: (column: string, options?: any) => ({
          eq: (column: string, value: any) => ({
            single: () => Promise.resolve({ data: null, error: null }),
            limit: (count: number) => Promise.resolve({ data: [], error: null }),
          }),
          limit: (count: number) => Promise.resolve({ data: [], error: null }),
        }),
      }),
      or: (condition: string) => Promise.resolve({ data: [], error: null }),
      order: (column: string, options?: any) => ({
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        limit: (count: number) => Promise.resolve({ data: [], error: null }),
      }),
    }),
    insert: (data: any) => Promise.resolve({ data: null, error: null }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
    }),
  }),
  functions: {
    invoke: async (name: string, options?: any) => {
      // Mock responses for different functions
      switch (name) {
        case 'create-checkout':
          return { 
            data: { url: '/success?session_id=cs_test_mock' }, 
            error: null 
          };
        case 'verify-payment':
          return { 
            data: { success: true, order: { amount: 49, download_token: 'mock-token', products: { title: 'Mock Product', file_type: 'PDF' } } }, 
            error: null 
          };
        case 'download-product':
          return { 
            data: { 
              success: true, 
              downloadUrl: 'https://example.com/download/mock-file.pdf',
              fileName: 'mock-file.pdf',
              fileSize: '1.2 MB',
              remainingDownloads: 4
            }, 
            error: null 
          };
        case 'subscribe-newsletter':
          return { 
            data: { success: true, message: 'Successfully subscribed!', discount: 'WELCOME20' }, 
            error: null 
          };
        case 'contact-form':
          return { 
            data: { success: true, message: 'Message sent successfully!' }, 
            error: null 
          };
        default:
          return { data: null, error: { message: 'Function not found' } };
      }
    },
  },
};

export const supabase = mockSupabase;