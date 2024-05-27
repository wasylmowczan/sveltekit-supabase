export const load = async () => {
    // This is a simple hack so hooks.server.ts is run on auth pages,
    // to ensure to redirect the user to the dashboard if they are already logged in
    return;
};