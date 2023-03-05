export const receivedPaginationFormat = async (req, res, next) => {
    req.query = {
        limit:req.query['limit'] || '10',
        page:req.query['page'] || '1',
    };
    next();
};