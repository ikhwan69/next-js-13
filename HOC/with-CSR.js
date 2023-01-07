// Memeriksa apakah request dari getServerSideProps ini adalah client side navigation atau tidak
// Referensi : https://github.com/vercel/next.js/discussions/32243#discussioncomment-1767080

export const withCSR = (next) => async (ctx) => {
    const isCSR = ctx.req.url?.startsWith('/_next');
    if (isCSR) {
        return {
            props: {},
        };
    }
    return next?.(ctx)
}